import {
  FormatedSearchableFilter,
  getPopularServiceLocations,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const useGetPopularServiceLocationsQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  searchQuery: string,
  options: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getPopularServiceLocations>,
    any
  >
) => {
  return useQuery(
    ["popular_locations", { pagination }],
    () => {
      return getPopularServiceLocations(pagination, filters, searchQuery);
    },
    options
  );
};
