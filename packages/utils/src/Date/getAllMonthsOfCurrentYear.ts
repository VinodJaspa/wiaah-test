import { FormatedDays, getMonthDays } from "./getCalenderDays";

export type MonthDetails = {
  month: {
    name: string;
    idx: number;
  };
  year: number;
  days: FormatedDays[];
};

// export const getAllMonthsOfCurrentYear = () => {

// };

export const getAllMonthsOfYear = (year: number): MonthDetails[] => {
  const months: MonthDetails[] = [];

  for (let i = 0; i <= 11; i++) {
    const monthName = new Date(Date.UTC(year, i, 1)).toLocaleDateString(
      "en-us",
      {
        month: "short",
      }
    );
    const monthDays = getMonthDays(i, year);
    months.push({
      days: monthDays,
      month: {
        name: monthName,
        idx: i,
      },
      year,
    });
  }

  return months;
};
