import { getServicesMetaDataFetcher, ServiceMetaData } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetServicesMetaDataQuery = (
  take: number,
  page: number,
  location: string,
  options?: UseQueryOptions<unknown, unknown, ServiceMetaData[], any>
) => {
  return useQuery(
    ["services", { take, page, location }],
    () => {
      return getServicesMetaDataFetcher(take, page, location);
    },
    options
  );
};
