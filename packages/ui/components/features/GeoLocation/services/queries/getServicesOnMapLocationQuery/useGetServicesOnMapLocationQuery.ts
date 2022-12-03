import {
  FormatedSearchableFilter,
  getServicesOnMapLocationsFetcher,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getServicesOnMapLocationQueryKey = (props: any) => [
  "servicesOnMapLocations",
  props,
];

export const useGetServicesOnMapLocationQuery = (
  filters?: FormatedSearchableFilter,
  options?: UseQueryOptions<
    any,
    any,
    AsyncReturnType<typeof getServicesOnMapLocationsFetcher>,
    any
  >
) => {
  return useQuery(
    getServicesOnMapLocationQueryKey({ filters }),
    () => getServicesOnMapLocationsFetcher(filters),
    options
  );
};
