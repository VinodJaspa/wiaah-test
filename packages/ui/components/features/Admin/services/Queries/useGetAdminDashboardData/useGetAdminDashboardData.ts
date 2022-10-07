import { getAdminDashboardFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getAdminDashboardDataQueryKey = () => ["AdminDashboardData"];
export const useGetAdminDashboardData = (
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getAdminDashboardFetcher>,
    any
  >
) =>
  useQuery(
    getAdminDashboardDataQueryKey(),
    () => getAdminDashboardFetcher(),
    options
  );
