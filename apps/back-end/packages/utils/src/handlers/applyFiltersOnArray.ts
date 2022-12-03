import { Filter } from "../types";
import { hasFilters } from "../validators";

export function ApplyFiltersOnArray<TObject>(
  arr: TObject[],
  filters: Filter<TObject>[]
): TObject[] {
  try {
    if (filters.length < 1) return arr;
    return arr.filter((obj) => hasFilters(obj, filters));
  } catch {
    return arr;
  }
}
