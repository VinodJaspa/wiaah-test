import { getResturantSearchFiltersFetcher, SearchFilterType } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetResturantSearchFiltersQuery = (
  options?: UseQueryOptions<unknown, unknown, SearchFilterType[], any>
) => {
  return useQuery(
    ["resturantSearchFilters"],
    () => {
      return getResturantSearchFiltersFetcher();
    },
    options
  );
};
