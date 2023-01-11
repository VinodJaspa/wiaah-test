import { AsyncReturnType } from "@UI/../types/src";
import { getHealthCenterDetailsFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getHealthCenterDetailsQueryKey = (filters: { id: string }) => [
  "healthCenterDetails",
  { filters },
];

export const useGetHealthCenterDetailsQuery = (
  filters: { id: string },
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getHealthCenterDetailsFetcher>,
    any
  >
) => {
  return useQuery(
    getHealthCenterDetailsQueryKey(filters),
    () => {
      return getHealthCenterDetailsFetcher(filters);
    },
    options
  );
};
