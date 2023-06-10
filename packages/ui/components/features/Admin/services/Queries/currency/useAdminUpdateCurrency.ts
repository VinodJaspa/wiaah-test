import { Exact, Mutation, UpdateCurrencyInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateCurrencyMutationVariables = Exact<{
  args: UpdateCurrencyInput;
}>;

export type AdminUpdateCurrencyMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateCurrency"
>;

export const useAdminUpdateCurrencyMutation = () => {
  return useMutation<
    boolean,
    unknown,
    AdminUpdateCurrencyMutationVariables["args"]
  >(["update-currency"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminUpdateCurrency($args:UpdateCurrencyInput!){
  updateCurrency(updateCurrencyArgs:$args)
}   
    `);

    const res = await client
      .setVariables<AdminUpdateCurrencyMutationVariables>({ args })
      .send<AdminUpdateCurrencyMutation>();

    return res.data.updateCurrency;
  });
};
