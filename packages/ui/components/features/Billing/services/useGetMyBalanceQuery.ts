import { Balance, Exact } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetMyBalanceQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyBalanceQuery = { __typename?: "Query" } & {
  getMyBalance: { __typename?: "Balance" } & Pick<
    Balance,
    "cashbackBalance" | "convertedCashbackBalance"
  >;
};

export const useGetMyBalanceQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyBalance{
  getMyBalance{
    cashbackBalance
  }
}
    `);

  return useQuery(["get-my-balance"], async () => {
    const res = await client.send<GetMyBalanceQuery>();

    return res.data.getMyBalance;
  });
};
