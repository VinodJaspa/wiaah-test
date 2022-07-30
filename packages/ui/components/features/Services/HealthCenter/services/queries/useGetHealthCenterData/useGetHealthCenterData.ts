import {
  FormatedSearchableFilter,
  getHealthCentersFilteredDataFetcher,
  HealthCenterData,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHealthCentersDataQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<HealthCenterData[]>,
    any
  >
) => {
  return useQuery(
    ["HealthCenterPractitionersData", { filters, pagination }],
    () => getHealthCentersFilteredDataFetcher(pagination, filters),
    options
  );
};
