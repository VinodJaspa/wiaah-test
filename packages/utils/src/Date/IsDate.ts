export function isDate(date: string | number | Date) {
  return !isNaN(Date.parse(new Date(date).toString()));
}
