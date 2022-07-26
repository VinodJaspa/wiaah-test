import {
  FormatedSearchableFilter,
  GetHealthCenterDetailsApiResponse,
  getHealthCenterDetailsFetcher,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

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
    ["healthCenterDetails", { filters }],
    () => {
      return getHealthCenterDetailsFetcher(filters);
    },
    options
  );
};
