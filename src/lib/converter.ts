import { type ValueOf } from "@/lib/types";

/**
 * プロパティ名にidとnameを持つオブジェクトの配列を、連想配列に変換する
 * @param obj プロパティ名にidとnameを持つオブジェクトの配列
 * @returns 連想配列
 */
export const objToAssociative = (
  obj: { id: string | number; name: string }[],
) =>
  obj.reduce<Record<string | number, string>>(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur.name,
    }),
    {},
  );

/**
 * 文字列をbooleanに変換する
 * "true"や"1"ならtrueを返す
 * "false"や"0"ならfalseを返す
 * @param value 変換する文字列
 */
export const strToBool = (value: string) => {
  if (!value) {
    return false;
  }
  return value.toLowerCase() === "true" || value === "1";
};

/**
 * 2進数を10進数に変換する
 * @param binaryArray 2進数
 * @returns 10進数
 */
export const binaryToDecimal = (binaryArray: boolean[]): number => {
  // 配列を反転して、最下位ビットを左に配置
  const reversedArray = binaryArray.slice().reverse();

  // reduce関数を使用して、10進数の値を計算
  // 0をtrue、1をfalseとして扱うため、currentがfalseの場合に加算する
  return reversedArray.reduce(
    (acc, current, index) => (!current ? acc + Math.pow(2, index) : acc),
    0,
  );
};

/**
 * 10進数を2進数に変換する
 * @param decimal 10進数
 * @param length 2進数の桁数
 * @returns 2進数の配列
 */
export const decimalToBinary = (decimal: number, length: number): boolean[] => {
  // 10進数を2進数に変換
  const binary = decimal.toString(2);
  const binaryArray = [...binary].map((value) => value === "0");

  // 必要に応じて、配列の長さを調整する
  if (length > binary.length) {
    const diff = length - binary.length;
    const trueArray = new Array<boolean>(diff).fill(true);
    return [...trueArray, ...binaryArray];
  }
  return binaryArray;
};

/**
 * Object.keysを型安全に使用するためのラッパー関数
 * @param obj オブジェクト
 */
export const getObjectKeys = <T extends Record<string, unknown>>(
  obj: T,
): (keyof T)[] => Object.keys(obj);

/**
 * Object.valuesを型安全に使用するためのラッパー関数
 * @param obj オブジェクト
 */
export const getObjectValues = <T extends Record<string, unknown>>(
  obj: T,
): ValueOf<T>[] => Object.values(obj) as ValueOf<T>[];

export const gradeNumberToString = (grade: number) => {
  if (grade >= 4) {
    return `H${grade - 3}`;
  } else {
    return `M${grade}`;
  }
};

export const gradeNumberToLongString = (grade: number) => {
  if (grade >= 4) {
    return `高校${grade - 3}年`;
  } else {
    return `中学${grade}年`;
  }
};

/**
 * 全角数字を半角数字に変換する
 * @param str 変換対象の文字列
 * @returns 半角数字に変換された文字列
 */
export const normalizeNumbers = (str: string): string => {
  return str.replace(/[０-９]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
  });
};

export const formatName = (
  lastName?: string | null,
  firstName?: string | null,
) => {
  if (!lastName || !firstName) {
    return "";
  }
  // check japanese or else
  const regex = /[ぁ-ん\u4E00-\u9FFF々]/;
  if (regex.test(lastName) || regex.test(firstName)) {
    return `${lastName} ${firstName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
};

/**
 * 半角と全角で分けて文字数をカウントする
 * 絵文字は全角扱い
 * @param str 文字列
 * @returns {{ halfWidth: number; fullWidth: number; count: number }} 半角文字数、全角文字数、総文字数
 */
export const countCharacters = (
  str: string,
): { halfWidth: number; fullWidth: number; count: number } => {
  let halfWidth = 0;
  let fullWidth = 0;

  // Intl.Segmenterを使用してグラフェムクラスター単位で分割
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const segments = segmenter.segment(str);

  for (const segment of segments) {
    const char = segment.segment;
    const codePoint = char.codePointAt(0);

    if (!codePoint) {
      continue;
    }

    // 複数の文字で構成される絵文字（合成文字）は全角扱い
    if (char.length > 1) {
      fullWidth++;
      continue;
    }

    // ASCII文字（半角）
    if (codePoint <= 0x007f) {
      halfWidth++;
    }
    // 半角カタカナ
    else if (codePoint >= 0xff61 && codePoint <= 0xff9f) {
      halfWidth++;
    }
    // East Asian Width プロパティに基づく判定
    else if (isFullWidthCharacter(codePoint)) {
      fullWidth++;
    }
    // その他は半角として扱う（ラテン文字の拡張など）
    else {
      halfWidth++;
    }
  }

  return {
    halfWidth,
    fullWidth,
    count: halfWidth + fullWidth * 2,
  };
};

/**
 * Unicode East Asian Width プロパティに基づいて全角文字かどうかを判定
 * @param codePoint Unicode コードポイント
 * @returns 全角文字の場合true
 */
const isFullWidthCharacter = (codePoint: number): boolean => {
  return (
    // ひらがな
    (codePoint >= 0x3041 && codePoint <= 0x3096) ||
    // カタカナ
    (codePoint >= 0x30a1 && codePoint <= 0x30fa) ||
    // CJK統合漢字
    (codePoint >= 0x4e00 && codePoint <= 0x9fff) ||
    // 全角英数字・記号
    (codePoint >= 0xff01 && codePoint <= 0xff60) ||
    (codePoint >= 0xffa0 && codePoint <= 0xffdc) ||
    // CJK記号・句読点
    (codePoint >= 0x3000 && codePoint <= 0x303f) ||
    // CJK拡張漢字
    (codePoint >= 0x3400 && codePoint <= 0x4dbf) ||
    (codePoint >= 0x20000 && codePoint <= 0x2a6df) ||
    (codePoint >= 0x2a700 && codePoint <= 0x2b73f) ||
    (codePoint >= 0x2b740 && codePoint <= 0x2b81f) ||
    (codePoint >= 0x2b820 && codePoint <= 0x2ceaf) ||
    // 絵文字ブロック
    (codePoint >= 0x1f600 && codePoint <= 0x1f64f) ||
    (codePoint >= 0x1f300 && codePoint <= 0x1f5ff) ||
    (codePoint >= 0x1f680 && codePoint <= 0x1f6ff) ||
    (codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff) ||
    (codePoint >= 0x2600 && codePoint <= 0x26ff) ||
    (codePoint >= 0x2700 && codePoint <= 0x27bf) ||
    (codePoint >= 0x1f900 && codePoint <= 0x1f9ff) ||
    (codePoint >= 0x1fa70 && codePoint <= 0x1faff) ||
    // その他のシンボル
    (codePoint >= 0x2000 && codePoint <= 0x206f) ||
    (codePoint >= 0x2100 && codePoint <= 0x214f) ||
    (codePoint >= 0x2190 && codePoint <= 0x21ff) ||
    (codePoint >= 0x2200 && codePoint <= 0x22ff)
  );
};
