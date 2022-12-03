import {
  FormatedSearchableFilter,
  getShopDetailsFetcher,
  QueryPaginationInputs,
  ShopDetailsApiResponse,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const useGetShopDetailsQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getShopDetailsFetcher>,
    any
  >
) => {
  return useQuery(
    ["shopDetails", { filters }],
    () => {
      return getShopDetailsFetcher(filters);
    },
    options
  );
};
