import { DateType } from "types";

export const getDaysDiff = (from: DateType, to: DateType): number | null => {
  if (isNaN(Date.parse(`${from}`)) || isNaN(Date.parse(`${to}`))) return null;
  const fromDay = new Date(from).getDate();
  const toDay = new Date(to).getDate();

  return toDay - fromDay;
};
