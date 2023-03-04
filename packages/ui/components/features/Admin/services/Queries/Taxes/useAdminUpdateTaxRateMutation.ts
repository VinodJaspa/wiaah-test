import { Exact, Mutation, UpdateTaxRateInput } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type AdminUpdateTaxRateMutationVariables = Exact<{
  args: UpdateTaxRateInput;
}>;

export type AdminUpdateTaxRateMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateTaxRate"
>;

export const useAdminUpdateTaxRateMutation = () =>
  useMutation<
    AdminUpdateTaxRateMutation["updateTaxRate"],
    unknown,
    AdminUpdateTaxRateMutationVariables["args"]
  >(["admin-create-tax-rate"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminUpdateTaxRate($args:UpdateTaxRateInput!){
  updateTaxRate(args:$args)
}
    `);

    const res = await client
      .setVariables<AdminUpdateTaxRateMutationVariables>({
        args,
      })
      .send<AdminUpdateTaxRateMutation>();

    return res.data.updateTaxRate;
  });
