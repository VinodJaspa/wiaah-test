import { Action } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

type args = string;
export const getActionQueryKey = (args: args) => ["get-action", { args }];

export const getActionQueryFetcher = (args: args) => {
  const client = createGraphqlRequestClient();

  const res: Action = {} as any;

  return res;
};

export const useGetActionQuery = (args: args) =>
  useQuery(getActionQueryKey(args), () => getActionQueryFetcher(args));
