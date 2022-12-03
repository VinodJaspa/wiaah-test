import {
  FilteredHotelsMetaDataType,
  FormatedSearchableFilter,
  getFilteredHotelsMetaData,
  PaginationFetchedData,
  QueryPaginationInputs,
  SearchFilterType,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetFilteredServicesMetaDataQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<FilteredHotelsMetaDataType[]>,
    any
  >
) => {
  return useQuery(
    ["filteredServicesMetaData", filters],
    () => getFilteredHotelsMetaData(pagination, filters),
    options
  );
};
