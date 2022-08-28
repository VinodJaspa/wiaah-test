import { getMyServicesFetcher, QueryPaginationInputs } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getMyServicesQueryKey = (pagination: QueryPaginationInputs) => [
  "myServices",
  { pagination },
];
export const useGetMyServicesQuery = (
  pagination: QueryPaginationInputs,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getMyServicesFetcher>,
    any
  >
) => {
  return useQuery(
    getMyServicesQueryKey(pagination),
    () => getMyServicesFetcher(pagination),
    options
  );
};
