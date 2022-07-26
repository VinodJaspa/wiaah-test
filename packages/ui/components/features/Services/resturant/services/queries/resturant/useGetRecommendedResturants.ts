import {
  FormatedSearchableFilter,
  getRecommendedResturantsFetcher,
  getRecommendedResturantsFetcherResponseType,
  QueryPaginationInputs,
  ResturantMetaDataType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetResturantsQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options: UseQueryOptions<
    unknown,
    unknown,
    getRecommendedResturantsFetcherResponseType,
    any
  >
) => {
  return useQuery(
    ["recommendedResturants", { pagination, filters }],
    () => {
      return getRecommendedResturantsFetcher(pagination, filters);
    },
    options
  );
};
