import jalaliday from "jalaliday";
import dayjs from "dayjs";

dayjs.extend(jalaliday);

export function getLocaleDay(date: number) {
  return dayjs(date).calendar("jalali").locale("fa").format("DD MMMM YYYY");
}
