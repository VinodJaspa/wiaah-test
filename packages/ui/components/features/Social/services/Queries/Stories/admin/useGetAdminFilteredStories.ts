import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

type args = {};
export const getAdminFilteredStoriesQueryKey = (args: args) => [
  "get-admin-filtered-stories",
  { args },
];

export const getAdminFilteredStoriesFetcher = (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  
  `);

  return client.setVariables<>({ args }).send<>();
};

export const useGetAdminFilteredStoriesQuery = (args: args) =>
  useQuery(getAdminFilteredStoriesQueryKey(args), () =>
    getAdminFilteredStoriesFetcher(args)
  );
