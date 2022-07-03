import { Filter } from "../types";

type ArgFilter<T> = keyof T;

export function generateFiltersOfArgs<TArgs>(
  args: Partial<Record<keyof TArgs, any>>,
  filters: ArgFilter<TArgs>[]
): Filter<TArgs>[] {
  if (typeof args !== "object") return [];
  let filtersList: Filter<TArgs>[] = [];
  filters.map((filter) => {
    if (filter in args) filtersList.push([filter, args[filter]]);
  });
  return filtersList;
}
