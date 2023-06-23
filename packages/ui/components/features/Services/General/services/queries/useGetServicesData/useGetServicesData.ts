import {
  FormatedSearchableFilter,
  getGeneralServicesData,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const useGetServicesQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getGeneralServicesData>,
    any
  >
) => {
  return useQuery(
    ["servicesData", { pagination, filters }],
    () => {
      return getGeneralServicesData(pagination, filters);
    },
    options
  );
};
