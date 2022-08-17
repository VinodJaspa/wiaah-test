import {
  FormatedSearchableFilter,
  getServicePostsOnMapDataFetcher,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getServicesPostsOnMapQueryKey = (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
) => ["ServicesPostsOnMap", { filters, pagination }];
export const useGetServicesPostsOnMapDataQuery = (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getServicePostsOnMapDataFetcher>,
    any
  >
) => {
  return useQuery(
    getServicesPostsOnMapQueryKey(filters, pagination),
    () => getServicePostsOnMapDataFetcher(filters, pagination),
    options
  );
};
