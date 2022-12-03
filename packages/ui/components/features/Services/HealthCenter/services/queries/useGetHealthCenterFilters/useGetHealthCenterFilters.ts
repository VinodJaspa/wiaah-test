import {
  FormatedSearchableFilter,
  getServiceSearchFiltersFetcher,
  SearchFilterType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import {
  ServicesRequestKeys,
  SERVICESTYPE_INDEXKEY,
} from "../../../../constants/ServicesRequestKeys";

export const useGetHealthCenterFiltersQuery = (
  options?: UseQueryOptions<unknown, unknown, SearchFilterType, any>
) => {
  return useQuery(
    ["getHealthCenterFilters"],
    () => {
      return getServiceSearchFiltersFetcher({
        [SERVICESTYPE_INDEXKEY]: ServicesRequestKeys.healthCenter,
      });
    },
    options
  );
};
