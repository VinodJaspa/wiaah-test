import { AsyncReturnType } from "@UI/../types/src";
import { getResturantServiceDetialsData } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getRestaurantServiceProviderDetailsDataQuerykey = (id: string) => [
  "resturantServiceDetialsData",
  { id },
];
export const useGetRestaurantServiceDetailsDataQuery = (
  id: string,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getResturantServiceDetialsData>,
    any
  >
) => {
  return useQuery(
    getRestaurantServiceProviderDetailsDataQuerykey(id),
    () => getResturantServiceDetialsData(id),
    options
  );
};
