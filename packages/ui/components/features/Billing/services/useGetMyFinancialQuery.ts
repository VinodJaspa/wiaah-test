import { Exact, FinancialAccount } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetMyFinAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyFinAccountsQuery = { __typename?: "Query" } & {
  getMyFinancialAccounts: Array<
    { __typename?: "FinancialAccount" } & Pick<
      FinancialAccount,
      "financialId" | "label" | "type" | "id"
    >
  >;
};

export const useGetMyFinancialAccountsQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyFinAccounts {
  getMyFinancialAccounts {
    financialId
    label
    type
    id
  }
}
    `);

  return useQuery(["get-my-financial-accounts"], async () => {
    const res = await client.send<GetMyFinAccountsQuery>();

    return res.data.getMyFinancialAccounts;
  });
};
