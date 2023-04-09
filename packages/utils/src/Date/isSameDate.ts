import { isDate } from "./IsDate";

export function isSameDay(date1: Date, date2: Date) {
  if (isDate(date1) && isDate(date2)) {
    const y1 = date1.getFullYear();
    const m1 = date1.getMonth();
    const d1 = date1.getDate();
    const y2 = date2.getFullYear();
    const m2 = date2.getMonth();
    const d2 = date2.getDate();

    return y1 === y2 && m1 === m2 && d1 === d2;
  }
}
