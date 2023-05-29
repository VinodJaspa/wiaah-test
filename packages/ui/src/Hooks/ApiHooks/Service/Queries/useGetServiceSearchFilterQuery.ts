import { ServiceType } from "@features/API";
import {
  FormatedSearchableFilter,
  getServiceSearchFiltersFetcher,
  SearchFilterType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetServiceSearchFiltersQuery = (
  serviceType: ServiceType,
  options?: UseQueryOptions<unknown, unknown, SearchFilterType[], any>
) => {
  return useQuery(
    ["serviceSearchFilters"],
    () => getServiceSearchFiltersFetcher(serviceType),
    options
  );
};
