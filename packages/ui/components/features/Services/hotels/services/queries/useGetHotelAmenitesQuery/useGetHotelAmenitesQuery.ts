import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";
import { getHotelAmenitesFetcher } from "api";

export const GetHotelAmenitesQueryKey = () => ["HotelAmenites"];
export const useGetHotelAmenitesQuery = (
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getHotelAmenitesFetcher>,
    ReturnType<typeof GetHotelAmenitesQueryKey>
  >
) => {
  return useQuery(
    GetHotelAmenitesQueryKey(),
    () => getHotelAmenitesFetcher(),
    options
  );
};
