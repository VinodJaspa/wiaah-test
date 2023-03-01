import { CreateTaxRateInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type AdminCreateTaxRateMutationVariables = Exact<{
  args: CreateTaxRateInput;
}>;

export type AdminCreateTaxRateMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createTaxRate"
>;

export const useAdminCreateTaxRateMutation = () =>
  useMutation<
    AdminCreateTaxRateMutation["createTaxRate"],
    unknown,
    AdminCreateTaxRateMutationVariables["args"]
  >(["admin-create-tax-rate"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminCreateTaxRate($args:CreateTaxRateInput!){
  createTaxRate(args:$args)
}
    `);

    const res = await client
      .setVariables<AdminCreateTaxRateMutationVariables>({
        args,
      })
      .send<AdminCreateTaxRateMutation>();

    return res.data.createTaxRate;
  });
