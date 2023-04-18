export function getNextNearestDate(
  dates: Date[],
  currentDate: Date
): Date | null {
  // Create a copy of the current date to avoid modifying the original
  const currentDateTime = new Date(currentDate.getTime());

  // Sort the dates array in ascending order
  dates.sort((a, b) => a.getTime() - b.getTime());

  // Iterate through the sorted dates array
  for (let i = 0; i < dates.length; i++) {
    // Check if the current date is less than the current element in the array
    if (currentDateTime.getTime() < dates[i].getTime()) {
      return dates[i];
    }
  }

  // If no dates in the array are greater than the current date, return null
  return null;
}
