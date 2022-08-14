import { getServicesPostsFetcher, QueryPaginationInputs } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getUseGetServicesPostsQueryKey = (
  pagination: QueryPaginationInputs
) => [`SocialServicesPosts`, { pagination }];
export const useGetServicesPostsQuery = (
  pagination: QueryPaginationInputs,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getServicesPostsFetcher>,
    any
  >
) => {
  return useQuery(
    getUseGetServicesPostsQueryKey(pagination),
    () => getServicesPostsFetcher(pagination),
    options
  );
};
