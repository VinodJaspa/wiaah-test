import {
  getHotelsMetaDataFetcher,
  HotelsMetaData,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHotelsMetaDataQuery = (
  pagination: QueryPaginationInputs,
  location: string,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<HotelsMetaData[]>,
    any
  >
) => {
  return useQuery(
    ["hotelsSearch", { pagination, location }],
    () => {
      return getHotelsMetaDataFetcher(pagination, location);
    },
    options
  );
};
