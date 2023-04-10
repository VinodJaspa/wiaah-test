import { isDate } from "class-validator";

export const GetDateOfDayInWeekOfMonth = (
  monthDate: Date,
  weekDay: number
): Date[] => {
  const res = isDate(monthDate);
  if (!res) throw new Error("not a date");

  const totalDaysLength = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate();

  const monthDates = [...Array(totalDaysLength)]
    .map((_, i) => {
      return new Date(monthDate.getFullYear(), monthDate.getMonth(), i + 1);
    })
    .filter((date, i) => {
      const _weekDay = date.getDay();

      return _weekDay === weekDay;
    });

  return monthDates;
};
