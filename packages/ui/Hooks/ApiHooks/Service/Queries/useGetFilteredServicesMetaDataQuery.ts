import {
  FilteredServiceMetaDataType,
  getFilteredServicesMetaData,
  SearchFilterType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetFilteredServicesMetaDataQuery = (
  filters: SearchFilterType[],
  options?: UseQueryOptions<
    unknown,
    unknown,
    FilteredServiceMetaDataType[],
    any
  >
) => {
  return useQuery(
    ["filteredServicesMetaData", filters],
    () => getFilteredServicesMetaData(filters),
    options
  );
};
