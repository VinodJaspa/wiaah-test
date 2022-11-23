export function generateTypedRecord<T, P extends { [name: string]: T }>(
  cfg: P
) {
  return cfg;
}
