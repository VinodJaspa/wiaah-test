import { Exact, FinancialAccount } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyFinAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyFinAccountsQuery = { __typename?: "Query" } & {
  getMyFinancialAccounts: Array<
    { __typename?: "FinancialAccount" } & Pick<
      FinancialAccount,
      | "financialId"
      | "label"
      | "type"
      | "id"
      | "bank_country"
      | "bank_number"
      | "card_exp_month"
      | "card_exp_year"
      | "cardLast4"
      | "currency"
      | "ownerId"
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
    bank_country
    bank_number
    card_exp_month
    card_exp_year
    cardLast4
    currency
    ownerId
  }
}
    `);

  return useQuery(["get-my-financial-accounts"], async () => {
    const res = await client.send<GetMyFinAccountsQuery>();

    return res.data.getMyFinancialAccounts;
  });
};
