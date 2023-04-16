import { createGraphqlRequestClient, getServiceDataFetcher } from "api";
import { useQuery } from "react-query";

export const getServiceDetailsQueryFetcher = async () => {
  const client = createGraphqlRequestClient();
  const res = await client.setQuery(``).setVariables({}).send();
};

export const useGetServiceDataQuery = (id: string) => {
  return useQuery(["ServiceDetails", { id }], () => getServiceDataFetcher(id), {
    enabled: !!id,
  });
};
