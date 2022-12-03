export type SearchFilterValue =
  | { min: number; max: number }
  | string[]
  | string;

export type FormatedSearchableFilter = Record<string, SearchFilterValue>;
