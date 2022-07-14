import {
  FormatedSearchableFilter,
  getHealthCenterSearchData,
  HealthCenterSearchSuggistionsData,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHealthCenterSearchSuggestionsQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    HealthCenterSearchSuggistionsData,
    any
  >
) => {
  return useQuery(
    ["healthCenterSearchSuggistions", { filters }],
    () => {
      return getHealthCenterSearchData(filters);
    },
    options
  );
};
