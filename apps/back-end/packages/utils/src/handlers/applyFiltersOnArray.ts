import { Filter } from "src/types";
import { hasFilters } from "src/validators";

export function ApplyFiltersOnArray<TObject>(
  arr: TObject[],
  filters: Filter<TObject>[]
) {
  try {
    if (filters.length < 1) return arr;
    return arr.filter((obj) => hasFilters(obj, filters));
  } catch {
    return arr;
  }
}
