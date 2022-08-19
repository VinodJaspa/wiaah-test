import {
  FormatedSearchableFilter,
  getResturantServiceApiResponseFetcher,
  getResturantServiceDetialsData,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

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
    ["resturantServiceDetialsData", { filters }],
    () => getResturantServiceDetialsData(filters),
    options
  );
};
