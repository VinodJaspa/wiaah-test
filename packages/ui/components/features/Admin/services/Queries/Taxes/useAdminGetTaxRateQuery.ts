import { Country, Exact, Scalars, TaxRate } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetTaxRateQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type AdminGetTaxRateQuery = { __typename?: "Query" } & {
  adminGetTaxRate: { __typename?: "TaxRate" } & Pick<
    TaxRate,
    "id" | "percent" | "title" | "appliedOnCountryIds"
  > & {
      appliedOnCountries: Array<
        { __typename?: "Country" } & Pick<Country, "code" | "id" | "name">
      >;
    };
};

type args = AdminGetTaxRateQueryVariables["id"];
export const adminGetTaxRateQueryKey = (args: args) => [
  "admin-get-tax-rates",
  { args },
];

export const adminGetTaxRateQueryFetcher = async (args: args) => {
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
    .setVariables<AdminGetTaxRateQueryVariables>({
      id: args,
    })
    .send<AdminGetTaxRateQuery>();

  return res.data.adminGetTaxRate;
};

export const useAdminGetTaxRateQuery = (args: args, enabled?: boolean) =>
  useQuery(
    adminGetTaxRateQueryKey(args),
    () => adminGetTaxRateQueryFetcher(args),
    { enabled }
  );
