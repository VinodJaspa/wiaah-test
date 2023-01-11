import { AsyncReturnType } from "types";
import { getServicesProviderDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getServiceProviderQueryKey = (id: string) => [
  "servicesProvider",
  { id },
];
export const useGetServicesProviderQuery = (
  id: string,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getServicesProviderDataFetcher>,
    any
  >
) => {
  return useQuery(
    getServiceProviderQueryKey(id),
    () => {
      return getServicesProviderDataFetcher({ id });
    },
    options
  );
};
