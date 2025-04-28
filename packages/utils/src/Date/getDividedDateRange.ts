export function getDatesInRangeHours(start: Date, end: Date): Date[] {
  const dates = [];
  const currentDate = new Date(start);

  // Iterate through each hour between the two dates

  while (currentDate.getTime() <= end.getTime()) {
    dates.push(new Date(currentDate));
    currentDate.setHours(currentDate.getHours() + 1);
  }

  return dates;
}
