import {
  FormatedSearchableFilter,
  getResturantServiceApiResponseFetcher,
  getResturantServiceDetialsData,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getRestaurantServiceProviderDetailsDataQuerykey = (
  filters: FormatedSearchableFilter
) => ["resturantServiceDetialsData", { filters }];
export const useGetRestaurantServiceDetailsDataQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    getResturantServiceApiResponseFetcher,
    any
  >
) => {
  return useQuery(
    getRestaurantServiceProviderDetailsDataQuerykey(filters),
    () => getResturantServiceDetialsData(filters),
    options
  );
};
