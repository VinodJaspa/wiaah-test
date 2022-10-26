export function ExcludeFieldsFromObject<
  TObj extends Record<string, any>,
  Tkeys extends (keyof TObj)[]
>(obj: TObj, keys: Tkeys): Exclude<TObj, Tkeys> {
  const newObj = { ...obj };

  if (Array.isArray(keys)) {
    keys.forEach((v) => {
      delete newObj[v];
    });
  }

  return newObj as Exclude<TObj, Tkeys>;
}
