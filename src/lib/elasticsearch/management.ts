// サーバーサイド専用の検索関数をスクリプト用にラップ
import { searchPresentationElastic } from "@/lib/elasticsearch/search";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// PostgreSQL検索関数のスクリプト用実装（server-onlyなし）
export const searchPresentationPostgreSQL = async (
  day: number,
  daytime: number[],
  genre: number[],
  keyword: string,
) => {
  const whereConditions: Prisma.PresentationWhereInput = {};

  // 日付条件の設定
  if (day === 1) {
    // 1日目のみ：firstDayが指定の時間帯で、かつ0でない（発表がある）
    whereConditions.AND = [
      { firstDay: { not: 0 } },
      { firstDay: { in: daytime } },
    ];
  } else if (day === 2) {
    // 2日目のみ：secondDayが指定の時間帯で、かつ0でない（発表がある）
    whereConditions.AND = [
      { secondDay: { not: 0 } },
      { secondDay: { in: daytime } },
    ];
  } else if (day === 0) {
    // 全日程：いずれかの日に指定の時間帯で発表がある
    whereConditions.OR = [
      {
        AND: [{ firstDay: { not: 0 } }, { firstDay: { in: daytime } }],
      },
      {
        AND: [{ secondDay: { not: 0 } }, { secondDay: { in: daytime } }],
      },
    ];
  }

  // ジャンル条件の設定（空の場合は条件に含めない）
  if (genre.length > 0) {
    const genreCondition = { genre: { hasSome: genre } };
    if (whereConditions.AND) {
      (whereConditions.AND as Prisma.PresentationWhereInput[]).push(
        genreCondition,
      );
    } else if (whereConditions.OR) {
      whereConditions.AND = [{ OR: whereConditions.OR }, genreCondition];
      delete whereConditions.OR;
    } else {
      Object.assign(whereConditions, genreCondition);
    }
  }

  // キーワード条件の設定（空の場合は条件に含めない）
  if (keyword.trim() !== "") {
    const keywordCondition = {
      OR: [
        { title: { contains: keyword, mode: "insensitive" as const } },
        { detail: { contains: keyword, mode: "insensitive" as const } },
      ],
    };

    if (whereConditions.AND) {
      (whereConditions.AND as Prisma.PresentationWhereInput[]).push(
        keywordCondition,
      );
    } else if (whereConditions.OR) {
      whereConditions.AND = [{ OR: whereConditions.OR }, keywordCondition];
      delete whereConditions.OR;
    } else {
      Object.assign(whereConditions, keywordCondition);
    }
  }

  const data = await prisma.presentation.findMany({
    where: whereConditions,
    select: {
      id: true,
      title: true,
      firstDayLocation: true,
      secondDayLocation: true,
      firstDay: true,
      secondDay: true,
      genre: true,
      detail: true,
      userId: false,
    },
    take: 75,
  });

  // ジャンルが指定されている場合のみソート
  if (genre.length > 0) {
    return data.sort((a, b) => {
      const countA = a.genre.filter((g) => genre.includes(g)).length;
      const countB = b.genre.filter((g) => genre.includes(g)).length;
      return countB - countA;
    });
  }

  return data;
};

// 検索結果の比較用型
interface SearchComparison {
  elasticsearch: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    count: number;
    time: number;
  };
  postgresql: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    count: number;
    time: number;
  };
  differences: {
    countDiff: number;
    uniqueInES: string[];
    uniqueInPG: string[];
  };
}

// Elasticsearch検索とPostgreSQL検索の比較テスト（スクリプト用）
export const compareSearchResults = async (
  day: number,
  daytime: number[],
  genre: number[],
  keyword: string,
): Promise<SearchComparison> => {
  const startES = Date.now();
  const esResults = await searchPresentationElastic(
    day,
    daytime,
    genre,
    keyword,
  );
  const esTime = Date.now() - startES;

  const startPG = Date.now();
  const pgResults = await searchPresentationPostgreSQL(
    day,
    daytime,
    genre,
    keyword,
  );
  const pgTime = Date.now() - startPG;

  // 結果IDを抽出して比較
  const esIds = new Set(esResults.map((r) => r.id));
  const pgIds = new Set(pgResults.map((r) => r.id));

  const uniqueInES = Array.from(esIds).filter((id) => !pgIds.has(id));
  const uniqueInPG = Array.from(pgIds).filter((id) => !esIds.has(id));

  return {
    elasticsearch: {
      results: esResults,
      count: esResults.length,
      time: esTime,
    },
    postgresql: {
      results: pgResults,
      count: pgResults.length,
      time: pgTime,
    },
    differences: {
      countDiff: esResults.length - pgResults.length,
      uniqueInES,
      uniqueInPG,
    },
  };
};

// パフォーマンステスト
export const performanceTest = async () => {
  const testCases = [
    {
      day: 0,
      daytime: [1, 2, 3, 4, 5],
      genre: [],
      keyword: "",
      name: "All results",
    },
    {
      day: 1,
      daytime: [3, 4],
      genre: [1, 2],
      keyword: "",
      name: "Day 1, periods 3-4, genres 1-2",
    },
    {
      day: 0,
      daytime: [1, 2, 3, 4, 5],
      genre: [],
      keyword: "発表",
      name: "Keyword: 発表",
    },
    {
      day: 1,
      daytime: [3],
      genre: [1],
      keyword: "プログラミング",
      name: "Complex search",
    },
  ];

  const results = [];

  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.name}`);

    const comparison = await compareSearchResults(
      testCase.day,
      testCase.daytime,
      testCase.genre,
      testCase.keyword,
    );

    results.push({
      testCase,
      comparison,
    });

    console.log(
      `ES: ${comparison.elasticsearch.count} results in ${comparison.elasticsearch.time}ms`,
    );
    console.log(
      `PG: ${comparison.postgresql.count} results in ${comparison.postgresql.time}ms`,
    );
    console.log(
      `Speed: ${comparison.elasticsearch.time < comparison.postgresql.time ? "ES faster" : "PG faster"}`,
    );
    console.log(`Count diff: ${comparison.differences.countDiff}`);
    console.log("---");
  }

  return results;
};
