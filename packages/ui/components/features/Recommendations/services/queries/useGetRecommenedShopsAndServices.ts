import {
  FormatedSearchableFilter,
  GetRecommendedShopsFetcher,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const useGetRecommendedShopsQueryKey = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
) => ["recommentedShopsAndServices", { pagination, filters }];

export const useGetRecommendedShopsQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof GetRecommendedShopsFetcher>,
    any
  >
) => {
  return useQuery(
    useGetRecommendedShopsQueryKey(pagination, filters),
    () => GetRecommendedShopsFetcher(pagination, filters),
    options
  );
};
