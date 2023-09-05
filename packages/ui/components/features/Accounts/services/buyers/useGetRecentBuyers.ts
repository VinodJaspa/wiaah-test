import { AddToDate, isDev } from "@UI/../utils/src";
import { getRandomUser } from "@UI/placeholder";
import {
  Account,
  Exact,
  GetBuyersAccountsInput,
  GetFilteredSellersAccountsInput,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetRecentBuyersQueryVariables = Exact<{
  args: GetBuyersAccountsInput;
}>;

export type GetRecentBuyersQuery = { __typename?: "Query" } & {
  getFilteredBuyers: Array<
    { __typename?: "Account" } & Pick<Account, "id" | "createdAt">
  >;
};

export const GetRecentBuyersQueryKey = (
  args: GetRecentBuyersQueryVariables["args"]
) => ["get-recent-sellers", { args }];

export const GetRecentBuyersQueryFetcher = async (
  args: GetRecentBuyersQueryVariables["args"]
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query GetRecentBuyers($args:GetBuyersAccountsInput!){
  getFilteredBuyers(
    getBuyersInput:$args
  ){
    id
    createdAt
  }
}
  `);

  return (
    await client
      .setVariables<GetRecentBuyersQueryVariables>({ args })
      .send<GetRecentBuyersQuery>()
  ).data.getFilteredBuyers;
};

export const useGetRecentBuyers = (
  pagination: GetRecentBuyersQueryVariables["args"]["pagination"],
  since: Date
) => {
  const args: GetRecentBuyersQueryVariables["args"] = {
    pagination,
    date: new Date(since).toString(),
  };
  return useQuery(GetRecentBuyersQueryKey(args), () => {
    if (isDev) {
      const res: GetRecentBuyersQuery["getFilteredBuyers"] = [...Array(2)].map(
        (_, i) => ({
          createdAt: AddToDate(new Date(), { hours: i }),
          id: i.toString(),
        })
      );
      
      return res;
    }
    return GetRecentBuyersQueryFetcher(args);
  });
};
