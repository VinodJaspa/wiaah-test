import {
  FilteredServiceMetaDataType,
  FormatedSearchableFilter,
  getFilteredServicesMetaData,
  SearchFilterType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetFilteredServicesMetaDataQuery = (
  filters: FormatedSearchableFilter,
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
