import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const START_DATE_UTC = dayjs
  .tz("2026-10-03T00:00:00", "Asia/Tokyo")
  .utc()
  .toDate();
export const END_DATE_UTC = dayjs
  .tz("2026-10-04T23:59:59", "Asia/Tokyo")
  .utc()
  .toDate();
