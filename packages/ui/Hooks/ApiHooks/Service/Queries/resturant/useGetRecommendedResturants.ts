import { getRecommendedResturantsFetcher, RecommendedResturantData } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetRecommendedResturantsQuery = (
  take: number,
  page: number,
  options: UseQueryOptions<unknown, unknown, RecommendedResturantData[], any>
) => {
  return useQuery(
    ["recommendedResturants", { take, page }],
    () => {
      return getRecommendedResturantsFetcher(take, page);
    },
    options
  );
};
