import { getAdminRecentSalesFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getAdminRecentSalesQueryKey = () => ["adminRecentOrders"];
export const useGetAdminRecentSales = (
  options?: UseQueryOptions<
    any,
    any,
    AsyncReturnType<typeof getAdminRecentSalesFetcher>,
    any
  >
) =>
  useQuery(
    getAdminRecentSalesQueryKey(),
    () => getAdminRecentSalesFetcher(),
    options
  );
