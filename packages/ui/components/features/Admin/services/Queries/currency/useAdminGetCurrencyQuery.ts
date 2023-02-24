import { AdminGetCurrenciesInput, Currency, Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetCurrenciesQueryVariables = Exact<{
  args: AdminGetCurrenciesInput;
}>;

export type AdminGetCurrenciesQuery = { __typename?: "Query" } & {
  adminGetCurrencies: Array<
    { __typename?: "Currency" } & Pick<
      Currency,
      | "code"
      | "exchangeRate"
      | "id"
      | "name"
      | "symbol"
      | "updatedAt"
      | "enabled"
    >
  >;
};

type args = AdminGetCurrenciesQueryVariables["args"];
export const adminGetCurrenciesQueryKey = (args: args) => [
  "admin-get-currencies",
  { args },
];

export const adminGetCurrneciesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetCurrencies($args:AdminGetCurrenciesInput!){
  adminGetCurrencies(args:$args) {
    code
    exchangeRate
    id
    name
    symbol
    updatedAt
    enabled
  }
}
  `);

  const res = await client
    .setVariables<AdminGetCurrenciesQueryVariables>({
      args,
    })
    .send<AdminGetCurrenciesQuery>();

  return res.data.adminGetCurrencies;
};

export const useAdminGetCurrenciesQuery = (args: args) =>
  useQuery(adminGetCurrenciesQueryKey(args), () =>
    adminGetCurrneciesQueryFetcher(args)
  );
