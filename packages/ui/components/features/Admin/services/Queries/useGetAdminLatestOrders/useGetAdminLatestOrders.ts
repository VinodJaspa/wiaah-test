import { getAdminLatestOrdersFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getAdminLatestOrdersQueryKey = () => ["adminLatestOrders"];
export const useGetAdminLatestOrders = (
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getAdminLatestOrdersFetcher>,
    ReturnType<typeof getAdminLatestOrdersQueryKey>
  >
) =>
  useQuery(
    getAdminLatestOrdersQueryKey(),
    () => getAdminLatestOrdersFetcher(),
    options
  );
