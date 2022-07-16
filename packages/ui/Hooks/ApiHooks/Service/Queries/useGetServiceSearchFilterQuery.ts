import {
  FormatedSearchableFilter,
  getServiceSearchFiltersFetcher,
  SearchFilterType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetServiceSearchFiltersQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<unknown, unknown, SearchFilterType[], any>
) => {
  return useQuery(
    ["serviceSearchFilters"],
    () => getServiceSearchFiltersFetcher(filters),
    options
  );
};
