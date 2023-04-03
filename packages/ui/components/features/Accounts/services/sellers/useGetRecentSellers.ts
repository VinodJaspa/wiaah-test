import { isDev } from "@UI/../utils/src";
import { getRandomUser } from "@UI/placeholder";
import { Account, Exact, GetFilteredSellersAccountsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetRecentSellersQueryVariables = Exact<{
  args: GetFilteredSellersAccountsInput;
}>;

export type GetRecentSellersQuery = { __typename?: "Query" } & {
  getFilteredSellers: Array<
    { __typename?: "Account" } & Pick<Account, "id" | "createdAt">
  >;
};

export const GetRecentSellersQueryKey = (
  args: GetRecentSellersQueryVariables["args"]
) => ["get-recent-sellers", { args }];

export const GetRecentSellersQueryFetcher = async (
  args: GetRecentSellersQueryVariables["args"]
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  query GetRecentSellers($args:GetFilteredSellersAccountsInput!){
  getFilteredSellers(
    getSellersInput:$args
  ){
    id
    createdAt
  }
}
  `);

  return (
    await client
      .setVariables<GetRecentSellersQueryVariables>({ args })
      .send<GetRecentSellersQuery>()
  ).data.getFilteredSellers;
};

export const useGetRecentSellers = (
  pagination: GetRecentSellersQueryVariables["args"]["pagination"],
  since: Date
) => {
  const args: GetRecentSellersQueryVariables["args"] = {
    pagination,
    date: new Date(since).toString(),
  };
  return useQuery(GetRecentSellersQueryKey(args), () => {
    if (isDev) {
      const res: GetRecentSellersQuery["getFilteredSellers"] = [
        ...Array(10),
      ].map(() => ({
        createdAt: new Date().toString(),
        id: getRandomUser().id,
      }));

      return res;
    }
    return GetRecentSellersQueryFetcher(args);
  });
};
