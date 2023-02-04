import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export const useGetAccount = (accountId: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);

  return useQuery(["admin-get-account", { accountId }], async () => {
    const res = await client.send();
  });
};
