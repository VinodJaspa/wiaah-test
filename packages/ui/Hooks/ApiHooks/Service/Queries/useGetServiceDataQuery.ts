import { getServiceDataFetcher } from "api";
import { useQuery } from "react-query";

export const useGetServiceDataQuery = (id: string) => {
  return useQuery(["ServiceDetails", { id }], () => getServiceDataFetcher(id), {
    enabled: !!id,
  });
};
