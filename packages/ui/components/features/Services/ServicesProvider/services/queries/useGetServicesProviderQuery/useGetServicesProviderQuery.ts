import {
  FormatedSearchableFilter,
  getServicesProviderDataFetcher,
  getServicesProviderDataFetcherResponse,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

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
    ["servicesProvider", { filters }],
    () => {
      return getServicesProviderDataFetcher(filters);
    },
    options
  );
};
