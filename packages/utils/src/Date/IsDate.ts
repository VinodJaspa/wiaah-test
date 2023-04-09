export function isDate(date: any) {
  return !isNaN(Date.parse(new Date(date).toString()));
}
