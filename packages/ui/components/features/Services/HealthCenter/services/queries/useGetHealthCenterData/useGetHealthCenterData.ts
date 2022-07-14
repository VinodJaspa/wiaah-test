import {
  FormatedSearchableFilter,
  getHealthCenterPractitionersFilteredDataFetcher,
  HealthCenterFilteredData,
  PaginationFetchedData,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHealthCenterDataQuery = (
  take: number,
  page: number,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<HealthCenterFilteredData[]>,
    any
  >
) => {
  return useQuery(
    ["HealthCenterData", { filters, take, page }],
    () =>
      getHealthCenterPractitionersFilteredDataFetcher({ take, page }, filters),
    options
  );
};
