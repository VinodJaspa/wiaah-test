import { getServiceSearchFiltersFetcher, SearchFilterType } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import {
  ServicesRequestKeys,
  SERVICESTYPE_INDEXKEY,
} from "../../../../constants/ServicesRequestKeys";
import { ServiceType } from "@features/API";

export const useGetHealthCenterFiltersQuery = (
  options?: UseQueryOptions<unknown, unknown, SearchFilterType, any>,
) => {
  return useQuery(
    ["getHealthCenterFilters"],
    () => {
      return getServiceSearchFiltersFetcher(ServiceType.HealthCenter);
    },
    options,
  );
};
