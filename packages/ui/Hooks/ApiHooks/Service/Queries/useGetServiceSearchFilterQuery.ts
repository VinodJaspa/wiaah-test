import { getServiceSearchFiltersFetcher, SearchFilterType } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetServiceSearchFiltersQuery = (
  options?: UseQueryOptions<unknown, unknown, SearchFilterType[], any>
) => {
  return useQuery(
    ["serviceSearchFilters"],
    () => getServiceSearchFiltersFetcher(),
    options
  );
};
