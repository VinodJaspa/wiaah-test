import { FormatedSearchableFilter, getServiceCheckoutDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getServiceCheckoutDataQueryKey = (
  filters: FormatedSearchableFilter
) => ["serviceCheckoutData", { filters }];

export const useGetServiceCheckoutDataQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getServiceCheckoutDataFetcher>,
    any
  >
) => {
  return useQuery(
    getServiceCheckoutDataQueryKey(filters),
    () => getServiceCheckoutDataFetcher(filters),
    options
  );
};
