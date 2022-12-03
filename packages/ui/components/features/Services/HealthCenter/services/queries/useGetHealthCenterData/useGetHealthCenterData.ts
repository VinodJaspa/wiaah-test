import {
  FormatedSearchableFilter,
  getHealthCentersFilteredDataFetcher,
  HealthCenterData,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const useGetHealthCentersDataQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getHealthCentersFilteredDataFetcher>,
    any
  >
) => {
  return useQuery(
    ["HealthCenterPractitionersData", { filters, pagination }],
    () => getHealthCentersFilteredDataFetcher(pagination, filters),
    options
  );
};
