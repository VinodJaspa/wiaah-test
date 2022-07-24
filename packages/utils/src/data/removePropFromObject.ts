export function removePropFromObject<T>(obj: T, prop: keyof T) {
  if (prop in obj) {
    const { [prop]: _, ...rest } = obj;
    return rest;
  } else {
    return obj;
  }
}
