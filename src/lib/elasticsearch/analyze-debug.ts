import client, { PRESENTATION_INDEX } from "@/lib/elasticsearch";

export const analyzeText = async (text: string) => {
  try {
    console.log(`=== Analyzing "${text}" ===`);

    // 日本語アナライザーでの解析
    const japaneseResponse = await client.indices.analyze({
      index: PRESENTATION_INDEX,
      analyzer: "kuromoji",
      text: text,
    });

    console.log("Japanese (Kuromoji) tokens:");
    japaneseResponse.tokens?.forEach((token, index) => {
      console.log(
        `  ${index + 1}. "${token.token}" (pos: ${token.start_offset}-${token.end_offset})`,
      );
    });

    // スタンダードアナライザーでの解析
    const standardResponse = await client.indices.analyze({
      index: PRESENTATION_INDEX,
      analyzer: "standard",
      text: text,
    });

    console.log("Standard tokens:");
    standardResponse.tokens?.forEach((token, index) => {
      console.log(
        `  ${index + 1}. "${token.token}" (pos: ${token.start_offset}-${token.end_offset})`,
      );
    });

    return {
      japanese: japaneseResponse.tokens,
      standard: standardResponse.tokens,
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    return null;
  }
};

export const testSearchMatching = async (
  searchTerm: string,
  targetText: string,
) => {
  console.log(`\n=== Testing: "${searchTerm}" vs "${targetText}" ===`);

  // 両方のテキストを解析
  const searchTokens = await analyzeText(searchTerm);
  const targetTokens = await analyzeText(targetText);

  if (searchTokens && targetTokens) {
    // 日本語アナライザーでのマッチング
    const searchJapanese = searchTokens.japanese?.map((t) => t.token) || [];
    const targetJapanese = targetTokens.japanese?.map((t) => t.token) || [];

    console.log("\nJapanese analyzer matching:");
    console.log(`Search tokens: [${searchJapanese.join(", ")}]`);
    console.log(`Target tokens: [${targetJapanese.join(", ")}]`);

    const japaneseMatches = searchJapanese.filter((token) =>
      targetJapanese.includes(token),
    );
    console.log(`Matches: [${japaneseMatches.join(", ")}]`);

    // スタンダードアナライザーでのマッチング
    const searchStandard = searchTokens.standard?.map((t) => t.token) || [];
    const targetStandard = targetTokens.standard?.map((t) => t.token) || [];

    console.log("\nStandard analyzer matching:");
    console.log(`Search tokens: [${searchStandard.join(", ")}]`);
    console.log(`Target tokens: [${targetStandard.join(", ")}]`);

    const standardMatches = searchStandard.filter((token) =>
      targetStandard.includes(token),
    );
    console.log(`Matches: [${standardMatches.join(", ")}]`);
  }
};
