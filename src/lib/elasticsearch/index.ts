import client, { PRESENTATION_INDEX } from "@/lib/elasticsearch";

// プレゼンテーションのマッピング定義
export const presentationMapping = {
  properties: {
    id: {
      type: "keyword" as const,
    },
    title: {
      type: "text" as const,
      analyzer: "japanese_normalized",
      fields: {
        keyword: {
          type: "keyword" as const,
        },
        exact: {
          type: "text" as const,
          analyzer: "standard",
        },
      },
    },
    detail: {
      type: "text" as const,
      analyzer: "japanese_normalized",
      fields: {
        exact: {
          type: "text" as const,
          analyzer: "standard",
        },
      },
    },
    firstDayLocation: {
      type: "integer" as const,
    },
    secondDayLocation: {
      type: "integer" as const,
    },
    firstDay: {
      type: "integer" as const,
    },
    secondDay: {
      type: "integer" as const,
    },
    genre: {
      type: "integer" as const,
    },
    userId: {
      type: "keyword" as const,
    },
    createdAt: {
      type: "date" as const,
    },
    updatedAt: {
      type: "date" as const,
    },
  },
};

// インデックスを作成する関数
export const createPresentationIndex = async () => {
  try {
    // インデックスが既に存在するかチェック
    const exists = await client.indices.exists({
      index: PRESENTATION_INDEX,
    });

    if (exists) {
      console.log(`Index ${PRESENTATION_INDEX} already exists`);
      return true;
    }

    // インデックスを作成
    const response = await client.indices.create({
      index: PRESENTATION_INDEX,
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
        analysis: {
          // カスタム文字フィルター
          char_filter: {
            normalize_chars: {
              type: "mapping",
              mappings: [
                "・ => ",
                "~ => 〜",
                "（ => (",
                "） => )",
                "「 => ",
                "」 => ",
                "『 => ",
                "』 => ",
                "０ => 0",
                "１ => 1",
                "２ => 2",
                "３ => 3",
                "４ => 4",
                "５ => 5",
                "６ => 6",
                "７ => 7",
                "８ => 8",
                "９ => 9",
                "Ａ => A",
                "Ｂ => B",
                "Ｃ => C",
                "Ｄ => D",
                "Ｅ => E",
                "Ｆ => F",
                "Ｇ => G",
                "Ｈ => H",
                "Ｉ => I",
                "Ｊ => J",
                "Ｋ => K",
                "Ｌ => L",
                "Ｍ => M",
                "Ｎ => N",
                "Ｏ => O",
                "Ｐ => P",
                "Ｑ => Q",
                "Ｒ => R",
                "Ｓ => S",
                "Ｔ => T",
                "Ｕ => U",
                "Ｖ => V",
                "Ｗ => W",
                "Ｘ => X",
                "Ｙ => Y",
                "Ｚ => Z",
                "ａ => a",
                "ｂ => b",
                "ｃ => c",
                "ｄ => d",
                "ｅ => e",
                "ｆ => f",
                "ｇ => g",
                "ｈ => h",
                "ｉ => i",
                "ｊ => j",
                "ｋ => k",
                "ｌ => l",
                "ｍ => m",
                "ｎ => n",
                "ｏ => o",
                "ｐ => p",
                "ｑ => q",
                "ｒ => r",
                "ｓ => s",
                "ｔ => t",
                "ｕ => u",
                "ｖ => v",
                "ｗ => w",
                "ｘ => x",
                "ｙ => y",
                "ｚ => z",
              ],
            },
          },
          // カスタムトークンフィルター
          filter: {
            // 濁点・半濁点の正規化
            japanese_normalization: {
              type: "icu_normalizer",
              name: "nfkc",
            },
            // カタカナ・ひらがなの正規化
            katakana_readingform: {
              type: "kuromoji_readingform",
              use_romaji: false,
            },
            // 助詞を除外しない品詞フィルター
            japanese_pos_keep_particles: {
              type: "kuromoji_part_of_speech",
              stoptags: [
                "助数詞",
                "副詞可能",
                "接頭詞",
                "動詞非自立",
                "形容詞非自立",
                "記号",
                "フィラー",
                "その他",
                "間投詞",
              ],
            },
          },
          analyzer: {
            // 表記揺れを吸収するアナライザー（助詞も保持）
            japanese_normalized: {
              type: "custom",
              char_filter: ["normalize_chars"],
              tokenizer: "kuromoji_tokenizer",
              filter: [
                "japanese_pos_keep_particles",
                "japanese_normalization",
                "lowercase",
                "cjk_width",
              ],
            },
            // 原形変換ありのアナライザー（フォールバック用）
            japanese_baseform: {
              type: "custom",
              char_filter: ["normalize_chars"],
              tokenizer: "kuromoji_tokenizer",
              filter: [
                "kuromoji_baseform",
                "japanese_pos_keep_particles",
                "japanese_normalization",
                "lowercase",
                "cjk_width",
              ],
            },
            // 従来の日本語アナライザー（互換性のため）
            japanese: {
              type: "custom",
              tokenizer: "kuromoji_tokenizer",
              filter: [
                "kuromoji_baseform",
                "kuromoji_part_of_speech",
                "lowercase",
              ],
            },
          },
        },
      },
      mappings: presentationMapping,
    });

    console.log("Presentation index created successfully:", response);
    return true;
  } catch (error) {
    console.error("Failed to create presentation index:", error);
    return false;
  }
};

// インデックスを削除する関数（開発用）
export const deletePresentationIndex = async () => {
  try {
    const exists = await client.indices.exists({
      index: PRESENTATION_INDEX,
    });

    if (!exists) {
      console.log(`Index ${PRESENTATION_INDEX} does not exist`);
      return true;
    }

    await client.indices.delete({
      index: PRESENTATION_INDEX,
    });

    console.log(`Index ${PRESENTATION_INDEX} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Failed to delete presentation index:", error);
    return false;
  }
};
