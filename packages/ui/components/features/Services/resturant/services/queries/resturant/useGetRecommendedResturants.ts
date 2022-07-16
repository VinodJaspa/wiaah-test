import {
  FormatedSearchableFilter,
  getRecommendedResturantsFetcher,
  ResturantMetaDataType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetResturantsQuery = (
  filters: FormatedSearchableFilter,
  take: number,
  page: number,
  options: UseQueryOptions<unknown, unknown, ResturantMetaDataType[], any>
) => {
  return useQuery(
    ["recommendedResturants", { take, page }],
    () => {
      return getRecommendedResturantsFetcher(take, page);
    },
    options
  );
};
