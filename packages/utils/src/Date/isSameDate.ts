import { isDateInstance } from "./IsDate";

export function isSameDay(date1: Date, date2: Date) {
  if (isDateInstance(date1) && isDateInstance(date2)) {
    const y1 = date1.getFullYear();
    const m1 = date1.getMonth();
    const d1 = date1.getDate();
    const y2 = date2.getFullYear();
    const m2 = date2.getMonth();
    const d2 = date2.getDate();

    return y1 === y2 && m1 === m2 && d1 === d2;
  }
}

export function isSameMinute(date1: Date, date2: Date) {
  if (isDateInstance(date1) && isDateInstance(date2)) {
    const y1 = date1.getFullYear();
    const m1 = date1.getMonth();
    const d1 = date1.getDate();
    const h1 = date1.getHours();
    const mi1 = date1.getMinutes();

    const y2 = date2.getFullYear();
    const m2 = date2.getMonth();
    const d2 = date2.getDate();
    const h2 = date2.getHours();
    const mi2 = date2.getMinutes();

    return y1 === y2 && m1 === m2 && d1 === d2 && h1 === h2 && mi1 === mi2;
  }
}

export function isDateWithin(
  target: Date,
  date1: Date,
  date2: Date,
  equel?: boolean
) {
  return equel
    ? date1 <= target && date2 >= target
    : date1 < target && date2 > target;
}
