import { getServicesSortingFilters, SearchFilterType } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetServicesSortingFiltersQuery = (
  options?: UseQueryOptions<unknown, unknown, SearchFilterType[], any>
) => {
  return useQuery(
    ["servicesSortingFilters"],
    () => {
      return getServicesSortingFilters();
    },
    options
  );
};
