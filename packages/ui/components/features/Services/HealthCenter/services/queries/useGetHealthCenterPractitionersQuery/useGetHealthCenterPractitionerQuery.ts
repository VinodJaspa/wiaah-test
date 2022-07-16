import {
  FormatedSearchableFilter,
  getHealthCenterPractitionersFilteredDataFetcher,
  HealthCenterPractitioner,
  PaginationFetchedData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetHealthCenterPractitionersQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<HealthCenterPractitioner[]>,
    any
  >
) => {
  return useQuery(
    ["healthCenterPractitinoersList", { pagination, filters }],
    () => {
      return getHealthCenterPractitionersFilteredDataFetcher(
        pagination,
        filters
      );
    },
    options
  );
};
