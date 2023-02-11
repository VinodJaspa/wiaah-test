import { Currency, Exact, WithdrawCurrency } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetWithdrawCurrenciesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetWithdrawCurrenciesQuery = { __typename?: "Query" } & {
  getWithdrawCurrencies: Array<
    { __typename?: "WithdrawCurrency" } & Pick<WithdrawCurrency, "code"> & {
        currency: { __typename?: "Currency" } & Pick<
          Currency,
          "code" | "exchangeRate" | "id" | "name" | "symbol"
        >;
      }
  >;
};

export const useGetWithdrawCurrneicesQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getWithdrawCurrencies{
  	getWithdrawCurrencies {
      code
      currency{
        code
        exchangeRate
        id
        name
        symbol
        
      }
    }
}
    `);

  return useQuery(["get-withdraw-currencies"], async () => {
    const res = await client.send<GetWithdrawCurrenciesQuery>();

    return res.data.getWithdrawCurrencies;
  });
};
