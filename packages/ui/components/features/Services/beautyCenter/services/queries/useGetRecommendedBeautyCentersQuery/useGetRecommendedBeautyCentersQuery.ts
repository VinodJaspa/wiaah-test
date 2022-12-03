import { getRecommendedBeautyCenterFetcher, QueryPaginationInputs } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getRecommendedBeautyCentersQueryKey = () => [
  "RecommendedBeautyCenters",
];

export const useGetRecommendedBeautyCentersQuery = (
  pagination: QueryPaginationInputs,
  options?: UseQueryOptions<
    any,
    any,
    AsyncReturnType<typeof getRecommendedBeautyCenterFetcher>,
    any
  >
) => {
  return useQuery(
    getRecommendedBeautyCentersQueryKey(),
    () => {
      return getRecommendedBeautyCenterFetcher(pagination);
    },
    options
  );
};
