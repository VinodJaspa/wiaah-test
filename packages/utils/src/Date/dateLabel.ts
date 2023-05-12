import { isThisMonth, isThisWeek, isToday, isYesterday } from "../helpers";

export const getDateLabel = (_date: string, lastEntityDate?: string) => {
  const date = new Date(_date);

  const lastNoti = lastEntityDate;
  const lastDate = lastNoti ? new Date(lastNoti) : null;

  const lastIsToday = lastDate ? isToday(lastDate) : null;

  const lastIsYesterday = lastDate ? isYesterday(lastDate) : null;

  const __isToday = isToday(date) && !lastIsToday;

  const __isYesterday = isYesterday(date) && !lastIsYesterday;

  const __isThisWeek = isThisWeek(date) && lastDate && lastDate > date;

  const __isThisMonth = isThisMonth(date) && lastDate && lastDate > date;

  const dateLabel = __isToday
    ? "Today"
    : __isYesterday
    ? "Yesterday"
    : __isThisWeek
    ? "This week"
    : __isThisMonth
    ? "This month"
    : null;

  return dateLabel;
};
