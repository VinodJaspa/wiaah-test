export function GetDateDiff(from: Date, to: Date) {
  const isValidFromDate = !isNaN(Date.parse(new Date(from).toString()));
  const isValidToDate = !isNaN(Date.parse(new Date(to).toString()));

  if (!isValidFromDate)
    throw new Error("first param is not a valid date object");
  if (!isValidToDate)
    throw new Error("secend param is not a valid date object");

  const secends = 1000;
  const minutes = 60 * secends;
  const hours = 60 * minutes;
  const day = 24 * hours;

  function clean(i: number) {
    return Math.abs(Math.floor(i));
  }

  const diffMs = from.getMilliseconds() - to.getMilliseconds();

  return {
    ms: diffMs,
    minutes: clean(diffMs / minutes),
    secends: clean(diffMs / secends),
    hours: clean(diffMs / hours),
    days: clean(diffMs / day),
  };
}
