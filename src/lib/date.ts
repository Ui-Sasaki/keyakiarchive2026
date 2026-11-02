import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatJSTDate(date: Date): string {
  const jstDate = dayjs(date).tz("Asia/Tokyo");
  return jstDate.format("YYYY/MM/DD HH:mm");
}

export function formatJSTDateSeconds(date: Date): string {
  const jstDate = dayjs(date).tz("Asia/Tokyo");
  return jstDate.format("YYYY/MM/DD HH:mm:ss");
}

export function formatJSTDateShort(date: Date): string {
  const jstDate = dayjs(date).tz("Asia/Tokyo");
  return jstDate.format("YYYY.MM.DD");
}

/**
 * JST（日本標準時）の日時を作成
 * @param dateString YYYY-MM-DD HH:mm 形式の文字列
 * @returns dayjs オブジェクト（JST）
 */
export function createJSTDate(dateString: string): dayjs.Dayjs {
  return dayjs.tz(dateString, "Asia/Tokyo");
}

/**
 * 現在時刻がJSTの指定日時を過ぎているかチェック
 * @param jstDateString JST での日時文字列（YYYY-MM-DD HH:mm 形式）
 * @returns 現在時刻が指定日時を過ぎている場合 true
 */
export function isAfterJST(jstDateString: string): boolean {
  const deadline = createJSTDate(jstDateString);
  const now = dayjs();
  return now.isAfter(deadline);
}
