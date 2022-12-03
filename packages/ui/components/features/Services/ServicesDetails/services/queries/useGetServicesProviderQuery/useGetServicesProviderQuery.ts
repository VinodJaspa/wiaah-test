import {
  FormatedSearchableFilter,
  getServicesProviderDataFetcher,
  getServicesProviderDataFetcherResponse,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getServiceProviderQueryKey = (
  filters: FormatedSearchableFilter
) => ["servicesProvider", { filters }];
export const useGetServicesProviderQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    getServicesProviderDataFetcherResponse,
    any
  >
) => {
  return useQuery(
    getServiceProviderQueryKey(filters),
    () => {
      return getServicesProviderDataFetcher(filters);
    },
    options
  );
};
