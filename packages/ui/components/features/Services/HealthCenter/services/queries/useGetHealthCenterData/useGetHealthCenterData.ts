import {
  FormatedSearchableFilter,
  getHealthCenterFilteredDataFetcher,
  HealthCenterData,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHealthCenterDataQuery = (
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
    () => getHealthCenterFilteredDataFetcher(pagination, filters),
    options
  );
};
