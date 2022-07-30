export const useDateManipulation = (date: string) => {
  function isValidDate(date: string) {
    const validDate = Date.parse(date);
    if (!validDate) throw new Error("invalid date");
  }

  function addDays(days: number) {
    try {
      isValidDate(date);

      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    } catch {
      return null;
    }
  }

  return {
    addDays,
  };
};
