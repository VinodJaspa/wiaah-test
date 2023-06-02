import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

type args = {};
export const searchShopsQueryKey = (args: args) => ["search-shops", { args }];

export const searchShopsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client.setQuery(``).setVariables<>(args).send<>();
};

export const useSearchShopsQuery = (args: args) =>
  useQuery(searchShopsQueryKey(args), () => searchShopsQueryFetcher(args));
