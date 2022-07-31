import {
  FormatedSearchableFilter,
  getShopsMapSearchDataFetcher,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const uesGetShopsOnmapSearchQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    any,
    any,
    AsyncReturnType<typeof getShopsMapSearchDataFetcher>,
    any
  >
) => {
  return useQuery(
    ["shopsOnmapSearchData", { pagination, filters }],
    () => getShopsMapSearchDataFetcher(pagination, filters),
    options
  );
};
