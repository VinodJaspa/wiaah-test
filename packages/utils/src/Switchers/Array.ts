export function mapArray<T, P>(
  array: T[] | undefined,
  cb: (data: T, index: number) => P,
  emptyArrayFallback: boolean = false,
  emptyArrayFallbackComp: React.ReactNode = "no records found"
): P[] {
  return Array.isArray(array)
    ? emptyArrayFallback && array.length < 1
      ? (emptyArrayFallbackComp as P[])
      : array.map(cb)
    : [];
}
