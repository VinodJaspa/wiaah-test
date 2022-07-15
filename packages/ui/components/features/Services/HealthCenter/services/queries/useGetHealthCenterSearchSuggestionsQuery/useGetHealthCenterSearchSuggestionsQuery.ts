import {
  FormatedSearchableFilter,
  getHealthCenterSearchData,
  HealthCenterSearchSuggistionsData,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHealthCenterSearchSuggestionsQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<HealthCenterSearchSuggistionsData>,
    any
  >
) => {
  return useQuery(
    ["healthCenterSearchSuggistions", { filters }],
    () => {
      return getHealthCenterSearchData(pagination, filters);
    },
    options
  );
};
