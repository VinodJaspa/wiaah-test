import {
  FormatedSearchableFilter,
  getProductsFetcher,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const useGetProductsQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getProductsFetcher>,
    any
  >
) => {
  return useQuery(
    ["getProducts", { pagination, filters }],
    () => {
      return getProductsFetcher(pagination, filters);
    },
    options
  );
};
