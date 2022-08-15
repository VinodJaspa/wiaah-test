import { FormatedSearchableFilter, getServicePostDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getServicePostDetailsQueryKey = (
  filters: FormatedSearchableFilter
) => ["ServicePostDetails", { filters }];
export const useGetServicePostDetailsQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getServicePostDataFetcher>,
    any
  >
) => {
  return useQuery(
    getServicePostDetailsQueryKey(filters),
    () => getServicePostDataFetcher(filters),
    options
  );
};
