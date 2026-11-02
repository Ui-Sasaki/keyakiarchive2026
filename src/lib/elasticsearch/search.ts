/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import client, { PRESENTATION_INDEX } from "@/lib/elasticsearch";

// Elasticsearch版の検索結果型
export interface ElasticsearchPresentationResult {
  id: string;
  title: string;
  detail: string | null;
  firstDayLocation: number;
  secondDayLocation: number;
  firstDay: number;
  secondDay: number;
  genre: number[];
  userId: string;
  _score?: number;
  _highlights?: {
    title?: string[];
    detail?: string[];
  };
}

// ファセット集計結果の型
export interface FacetBucket {
  key: string | number;
  doc_count: number;
}

// 検索クエリを解析してフレーズと通常のキーワードに分ける
const parseSearchQuery = (
  query: string,
): { phrases: string[]; keywords: string[] } => {
  const phrases: string[] = [];
  const keywords: string[] = [];

  // 引用符で囲まれた部分を抽出
  const phraseRegex = /"([^"]+)"/g;
  let match;
  let lastIndex = 0;

  while ((match = phraseRegex.exec(query)) !== null) {
    // 引用符より前の部分を通常のキーワードとして追加
    const beforePhrase = query.substring(lastIndex, match.index).trim();
    if (beforePhrase) {
      keywords.push(...beforePhrase.split(/\s+/).filter((k) => k.length > 0));
    }

    // 引用符内の部分をフレーズとして追加
    phrases.push(match[1]);
    lastIndex = phraseRegex.lastIndex;
  }

  // 最後の引用符以降の部分を通常のキーワードとして追加
  const remaining = query.substring(lastIndex).trim();
  if (remaining) {
    keywords.push(...remaining.split(/\s+/).filter((k) => k.length > 0));
  }

  return { phrases, keywords };
};

// Elasticsearch版のプレゼンテーション検索関数
export const searchPresentationElastic = async (
  day: number,
  daytime: number[],
  genre: number[],
  keyword: string,
  enableFuzzySearch: boolean = true,
  includeDetailSearch: boolean = true,
): Promise<ElasticsearchPresentationResult[]> => {
  try {
    // Elasticsearchクエリを構築
    const query: any = {
      bool: {
        must: [],
        filter: [],
      },
    };

    // キーワード検索条件
    if (keyword.trim() !== "") {
      const { phrases, keywords } = parseSearchQuery(keyword);
      const searchFields = includeDetailSearch
        ? ["title^3", "detail^2"]
        : ["title^3"];
      const exactFields = includeDetailSearch
        ? ["title.exact^3", "detail.exact^2"]
        : ["title.exact^3"];

      const mustQueries = [];

      // 完全一致フレーズ検索（引用符で囲まれた部分）
      phrases.forEach((phrase) => {
        const phraseQueries = [
          // 完全一致検索（exact フィールドを使用）
          {
            multi_match: {
              query: phrase,
              fields: exactFields,
              type: "phrase",
            },
          },
        ];

        mustQueries.push({
          bool: {
            should: phraseQueries,
            minimum_should_match: 1,
          },
        });
      });

      // 通常のキーワード検索（引用符で囲まれていない部分）
      if (keywords.length > 0) {
        const keywordQuery = keywords.join(" ");
        const shouldQueries = [
          // 活用形を保持する日本語正規化アナライザーでの検索（高優先度）
          {
            multi_match: {
              query: keywordQuery,
              fields: searchFields,
              type: "best_fields",
              analyzer: "japanese_normalized",
              boost: 5.0, // 活用形保持を強く優先
              ...(enableFuzzySearch && { fuzziness: "AUTO" }),
            },
          },
          // 原形変換ありアナライザーでの検索（低優先度）
          {
            multi_match: {
              query: keywordQuery,
              fields: searchFields,
              type: "best_fields",
              analyzer: "japanese_baseform",
              boost: 0.5, // 原形変換は低い優先度
              ...(enableFuzzySearch && { fuzziness: "AUTO" }),
            },
          },
          // 従来の日本語アナライザーでの検索（フォールバック）
          {
            multi_match: {
              query: keywordQuery,
              fields: searchFields,
              type: "best_fields",
              analyzer: "japanese",
              boost: 0.3,
              ...(enableFuzzySearch && { fuzziness: "AUTO" }),
            },
          },
          // スタンダードアナライザーでの検索（さらなるフォールバック）
          {
            multi_match: {
              query: keywordQuery,
              fields: searchFields,
              type: "best_fields",
              analyzer: "standard",
              boost: 0.1,
            },
          },
        ];

        // ワイルドカード検索（部分一致）- 通常のキーワードのみ
        const wildcardQueries = [{ wildcard: { title: `*${keywordQuery}*` } }];

        if (includeDetailSearch) {
          wildcardQueries.push({ wildcard: { detail: `*${keywordQuery}*` } });
        }

        shouldQueries.push({
          bool: {
            should: wildcardQueries,
          },
        });

        mustQueries.push({
          bool: {
            should: shouldQueries,
            minimum_should_match: 1,
          },
        });
      }

      // フレーズまたはキーワードのクエリをmustに追加
      if (mustQueries.length > 0) {
        query.bool.must.push(...mustQueries);
      }
    }

    // 日付条件の設定
    if (day === 1) {
      // 1日目のみ：firstDayが指定の時間帯で、かつ0でない（発表がある）
      query.bool.filter.push({
        bool: {
          must: [
            { range: { firstDay: { gt: 0 } } },
            { terms: { firstDay: daytime } },
          ],
        },
      });
    } else if (day === 2) {
      // 2日目のみ：secondDayが指定の時間帯で、かつ0でない（発表がある）
      query.bool.filter.push({
        bool: {
          must: [
            { range: { secondDay: { gt: 0 } } },
            { terms: { secondDay: daytime } },
          ],
        },
      });
    } else if (day === 0) {
      // 全日程：いずれかの日に指定の時間帯で発表がある
      query.bool.filter.push({
        bool: {
          should: [
            {
              bool: {
                must: [
                  { range: { firstDay: { gt: 0 } } },
                  { terms: { firstDay: daytime } },
                ],
              },
            },
            {
              bool: {
                must: [
                  { range: { secondDay: { gt: 0 } } },
                  { terms: { secondDay: daytime } },
                ],
              },
            },
          ],
          minimum_should_match: 1,
        },
      });
    }

    // ジャンル条件
    if (genre.length > 0) {
      query.bool.filter.push({
        terms: {
          genre: genre,
        },
      });
    }

    // Elasticsearchクエリを実行
    const searchParams: any = {
      index: PRESENTATION_INDEX,
      body: {
        query,
        sort: [
          { _score: { order: "desc" } },
          { "title.keyword": { order: "asc" } },
        ],
        size: 100,
      },
    };

    // ハイライト設定
    if (keyword.trim() !== "") {
      searchParams.body.highlight = {
        fields: {
          title: {
            type: "unified",
            pre_tags: ["<em>"],
            post_tags: ["</em>"],
            number_of_fragments: 0,
          },
          "title.exact": {
            type: "unified",
            pre_tags: ["<em>"],
            post_tags: ["</em>"],
            number_of_fragments: 0,
          },
          detail: {
            type: "unified",
            pre_tags: ["<em>"],
            post_tags: ["</em>"],
            fragment_size: 150,
            number_of_fragments: 3,
          },
          "detail.exact": {
            type: "unified",
            pre_tags: ["<em>"],
            post_tags: ["</em>"],
            fragment_size: 150,
            number_of_fragments: 3,
          },
        },
      };
    }

    const response = await client.search(searchParams);

    // 結果を変換
    const results: ElasticsearchPresentationResult[] = response.hits.hits.map(
      (hit: any) => ({
        id: hit._source.id,
        title: hit._source.title,
        detail: hit._source.detail,
        firstDayLocation: hit._source.firstDayLocation,
        secondDayLocation: hit._source.secondDayLocation,
        firstDay: hit._source.firstDay,
        secondDay: hit._source.secondDay,
        genre: hit._source.genre,
        userId: hit._source.userId,
        _score: hit._score,
        _highlights: hit.highlight
          ? {
              title: hit.highlight.title || hit.highlight["title.exact"],
              detail: hit.highlight.detail || hit.highlight["detail.exact"],
            }
          : undefined,
      }),
    );

    return results;
  } catch (error) {
    console.error("Elasticsearch search failed:", error);
    throw error;
  }
};
