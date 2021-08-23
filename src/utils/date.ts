import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export function getLocaleDay(date: number) {
  return dayjs(date).calendar("jalali").locale("fa").format("DD MMMM YYYY");
}
