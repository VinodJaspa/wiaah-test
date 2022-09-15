export function mapArray<T, P>(
  array: T[],
  cb: (data: T, index: number) => P
): P[] {
  return Array.isArray(array) ? array.map(cb) : [];
}
