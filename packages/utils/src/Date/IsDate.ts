export function isDate(date: any) {
  return !isNaN(Date.parse(new Date(date).toString()));
}

export function isDateInstance(date: any) {
  return date instanceof Date;
}
