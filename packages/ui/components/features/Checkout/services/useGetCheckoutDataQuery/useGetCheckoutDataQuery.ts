import { FormatedSearchableFilter, getCheckoutDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getCheckoutDataQueryKey = (filters: FormatedSearchableFilter) => [
  "CheckoutData",
  { filters },
];

export const useGetCheckoutDataQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getCheckoutDataFetcher>,
    any
  >
) => {
  return useQuery(
    getCheckoutDataQueryKey(filters),
    () => getCheckoutDataFetcher(filters),
    options
  );
};
