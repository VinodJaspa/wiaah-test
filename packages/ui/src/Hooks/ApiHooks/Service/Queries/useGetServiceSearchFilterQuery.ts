// useServiceFilters.ts
import { ServiceType } from "@features/API";
import { getServiceSearchFiltersFetcher, SearchFilterType } from "api";
import { useQuery } from "react-query";


export const useGetServiceSearchFiltersQuery = (serviceType: ServiceType) => {
  return useQuery<SearchFilterType[]>(
    ["serviceSearchFilters", serviceType],
    () => getServiceSearchFiltersFetcher(serviceType)
  );
};
