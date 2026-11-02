// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import client, { PRESENTATION_INDEX } from "@/lib/elasticsearch";

export const testScoring = async (keyword: string) => {
  try {
    console.log(`\n=== Testing scoring for: "${keyword}" ===`);

    // 現在の複合検索クエリ
    const compositeQuery = {
      bool: {
        should: [
          // 日本語アナライザー
          {
            multi_match: {
              query: keyword,
              fields: ["title^3", "detail^2"],
              type: "best_fields",
              analyzer: "japanese",
              fuzziness: "AUTO",
            },
          },
          // スタンダードアナライザー
          {
            multi_match: {
              query: keyword,
              fields: ["title^2", "detail"],
              type: "best_fields",
              analyzer: "standard",
            },
          },
          // ワイルドカード
          {
            bool: {
              should: [
                { wildcard: { title: `*${keyword}*` } },
                { wildcard: { detail: `*${keyword}*` } },
              ],
            },
          },
        ],
        minimum_should_match: 1,
      },
    };

    const response = await client.search({
      index: PRESENTATION_INDEX,
      body: {
        query: compositeQuery,
        size: 5,
        explain: true, // スコア計算の詳細を取得
      },
    });

    console.log(
      `Found ${response.hits.total?.value || response.hits.total} results`,
    );

    response.hits.hits.forEach((hit, index) => {
      console.log(`\n${index + 1}. Score: ${hit._score?.toFixed(4)}`);
      console.log(`   Title: ${hit._source?.title}`);
      console.log(`   Detail: ${hit._source?.detail?.substring(0, 50)}...`);

      // スコア計算の詳細（簡略版）
      if (hit._explanation) {
        console.log(`   Score explanation: ${hit._explanation.description}`);
      }
    });

    // 個別アナライザーでのテスト
    console.log("\n--- Individual analyzer tests ---");

    // 日本語アナライザーのみ
    const japaneseResponse = await client.search({
      index: PRESENTATION_INDEX,
      body: {
        query: {
          multi_match: {
            query: keyword,
            fields: ["title^3", "detail^2"],
            type: "best_fields",
            analyzer: "japanese",
          },
        },
        size: 3,
      },
    });

    console.log("\nJapanese analyzer only:");
    japaneseResponse.hits.hits.forEach((hit, index) => {
      console.log(
        `  ${index + 1}. Score: ${hit._score?.toFixed(4)} - ${hit._source?.title}`,
      );
    });

    // スタンダードアナライザーのみ
    const standardResponse = await client.search({
      index: PRESENTATION_INDEX,
      body: {
        query: {
          multi_match: {
            query: keyword,
            fields: ["title^2", "detail"],
            type: "best_fields",
            analyzer: "standard",
          },
        },
        size: 3,
      },
    });

    console.log("\nStandard analyzer only:");
    standardResponse.hits.hits.forEach((hit, index) => {
      console.log(
        `  ${index + 1}. Score: ${hit._score?.toFixed(4)} - ${hit._source?.title}`,
      );
    });
  } catch (error) {
    console.error("Scoring test failed:", error);
  }
};
