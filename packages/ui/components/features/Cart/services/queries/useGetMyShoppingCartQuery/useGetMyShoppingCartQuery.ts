import { getMyShoppingCartFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getMyShoppingCartQueryKey = () => ["MyShoppingCart"];

export const useGetMyShoppingCartQuery = (
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getMyShoppingCartFetcher>,
    any
  >
) => {
  return useQuery(
    getMyShoppingCartQueryKey(),
    () => getMyShoppingCartFetcher(),
    options
  );
};
