import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

// Types allowed for input
export type DateInput = string | number | Date | null | undefined;

/**
 * Format date safely
 */
export function dateTimeFormat(
  dateTime: DateInput,
  dateFormat: string = "DD-MM-YYYY"
): string {
  return dateTime ? dayjs(dateTime).format(dateFormat) : "";
}

/**
 * Display formatted date OR 'lifetime'
 */
export function displayDate(
  dateTime: DateInput,
  dateFormat: string = "DD-MM-YYYY HH:mm"
): string {
  if (typeof dateTime === "string" && dateTime.toLowerCase() === "lifetime") {
    return "lifetime";
  }

  return dateTime ? dateTimeFormat(dateTime, dateFormat) : "";
}
