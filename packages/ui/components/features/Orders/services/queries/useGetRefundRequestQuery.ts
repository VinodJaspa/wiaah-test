import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

type args = {};
export const getRefundRequestQueryKey = (args: args) => [
  "refund-request",
  { args },
];

export const getRefundRequestQueryFetcher = async () => {
  const client = createGraphqlRequestClient();

  const res = await client.setQuery(``).setVariables().send();

  return res;
};

export const useGetRefundRequestQuery = (args: args) => {
  return useQuery(getRefundRequestQueryKey(args), () =>
    getRefundRequestQueryFetcher(args)
  );
};
