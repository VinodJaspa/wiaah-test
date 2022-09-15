export function mapArray<T>(
  array: T[],
  cb: (data: T, index: number) => any
): T[] {
  return Array.isArray(array) ? array.map(cb) : [];
}
