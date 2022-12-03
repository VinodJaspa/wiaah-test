export function FilterAndAddToArray<T>(
  state: T[],
  item: T,
  filterType: "include" | "exclude" = "include",
  filterKey?: keyof T
): T[] {
  const filtered = state.filter((i) => {
    switch (filterType) {
      case "include":
        if (!filterKey) return i === item;
        return i[filterKey] === item[filterKey];

      case "exclude":
        if (!filterKey) return i !== item;
        return i[filterKey] !== item[filterKey];
      default:
        return false;
    }
  });
  return [...filtered, item];
}
