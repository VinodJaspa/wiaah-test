import {
  FormatedSearchableFilter,
  GetHealthCenterDetailsApiResponse,
  getHealthCenterDetailsFetcher,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getHealthCenterDetailsQueryKey = (
  filters: FormatedSearchableFilter
) => ["healthCenterDetails", { filters }];

export const useGetHealthCenterDetailsQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    GetHealthCenterDetailsApiResponse,
    any
  >
) => {
  return useQuery(
    getHealthCenterDetailsQueryKey(filters),
    () => {
      return getHealthCenterDetailsFetcher(filters);
    },
    options
  );
};
