export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type DeepRequired<T> = T extends object
  ? Required<{
      [P in keyof T]: DeepRequired<Required<T[P]>>;
    }>
  : Required<T>;
