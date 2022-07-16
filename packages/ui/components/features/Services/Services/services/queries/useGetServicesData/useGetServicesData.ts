import {
  FormatedSearchableFilter,
  getServicesData,
  PaginationFetchedData,
  QueryPaginationInputs,
  ServiceData,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetServicesData = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationFetchedData<ServiceData[]>,
    any
  >
) => {
  return useQuery(
    ["servicesData", { pagination, filters }],
    () => {
      return getServicesData(pagination, filters);
    },
    options
  );
};
