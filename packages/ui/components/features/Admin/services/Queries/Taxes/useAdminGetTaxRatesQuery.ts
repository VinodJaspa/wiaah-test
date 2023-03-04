import { AdminGetTaxRatesInput, Country, Exact, TaxRate } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetTaxRatesQueryVariables = Exact<{
  args: AdminGetTaxRatesInput;
}>;

export type AdminGetTaxRatesQuery = { __typename?: "Query" } & {
  adminGetTaxRates: Array<
    { __typename?: "TaxRate" } & Pick<
      TaxRate,
      "id" | "percent" | "title" | "appliedOnCountryIds"
    > & {
        appliedOnCountries: Array<
          { __typename?: "Country" } & Pick<Country, "code" | "id" | "name">
        >;
      }
  >;
};

type args = AdminGetTaxRatesQueryVariables["args"];
export const adminGetTaxRatesQueryKey = (args: args) => [
  "admin-get-tax-rates",
  { args },
];

export const adminGetTaxRatesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetTaxRate($id:String!){
  adminGetTaxRate(id:$id){
    id
    percent
    title
    appliedOnCountryIds
 	   appliedOnCountries{
      code
      id
      name
    }
  }
}
  `);

  const res = await client
    .setVariables<AdminGetTaxRatesQueryVariables>({
      args,
    })
    .send<AdminGetTaxRatesQuery>();

  return res.data.adminGetTaxRates;
};

export const useAdminGetTaxRatesQuery = (args: args) =>
  useQuery(adminGetTaxRatesQueryKey(args), () =>
    adminGetTaxRatesQueryFetcher(args)
  );
