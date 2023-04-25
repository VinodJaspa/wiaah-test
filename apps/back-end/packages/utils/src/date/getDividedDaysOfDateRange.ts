export function getDatesInRangeDays(start: Date, end: Date): Date[] {
  const dates = [];
  const _end = new Date(end.setHours(0));
  let currentDate = new Date(start.setHours(0));

  // Iterate through each hour between the two dates

  while (currentDate.getTime() < _end.getTime()) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
