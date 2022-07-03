import { Filter } from "../types";

export function hasFilters<T>(obj: T, filters: Filter<T>[]): boolean {
  return filters.every(([key, value]) => obj[key] === value);
}
