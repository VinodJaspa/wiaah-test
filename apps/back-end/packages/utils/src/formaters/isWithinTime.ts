export function isWithinTime(from: Date, to: Date): boolean {
  const fromIsValid = !isNaN(Date.parse(new Date(from).toISOString()));
  const toIsValid = !isNaN(Date.parse(new Date(to).toISOString()));

  if (!fromIsValid || !toIsValid) throw new Error("bad date format");

  const baseDate = new Date();
  const fromDate = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    from.getHours(),
    from.getMinutes(),
    from.getSeconds(),
    from.getMilliseconds()
  );

  const toDate = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    to.getHours(),
    to.getMinutes(),
    to.getSeconds(),
    to.getMilliseconds()
  );

  const parsedFrom = Date.parse(fromDate.toISOString());
  const parsedTo = Date.parse(toDate.toISOString());
  const parsedNow = Date.parse(baseDate.toISOString());

  return parsedNow > parsedFrom && parsedNow < parsedTo;
}
