export function removePropFromObject<T extends object>(
  obj: T,
  prop: keyof T
): Omit<T, typeof prop> {
  if (prop in obj) {
    const { [prop]: _, ...rest } = obj;
    return rest;
  } else {
    return obj;
  }
}
