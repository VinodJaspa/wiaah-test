import { getPopularServiceLocations, Location } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetPopularServiceLocationsQuery = (
  take: number,
  page: number,
  searchQuery: string,
  options: UseQueryOptions<unknown, unknown, Location[], any>
) => {
  return useQuery(
    ["popular_locations", { take, page }],
    () => {
      return getPopularServiceLocations(take, page, searchQuery);
    },
    options
  );
};
