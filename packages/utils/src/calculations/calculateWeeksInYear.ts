export const CalculateWeeksInYear = (date: Date): number => {
  const year = new Date(date).getFullYear();

  // January 1st of the year
  const januaryFirst = new Date(year, 0, 1);

  // January 1st of the next year
  const nextJanuaryFirst = new Date(year + 1, 0, 1);

  // Subtract the two dates and divide by the number of milliseconds in a week
  const weeksInYear = Math.ceil(
    (nextJanuaryFirst.getTime() - januaryFirst.getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  return weeksInYear;
};
