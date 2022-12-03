export function createTypedRecord<TValues>() {
  return function createRecord<T extends { [name: string]: TValues }>(cfg: T) {
    return cfg;
  };
}
