import { Exact, Scalars, ShippingRule } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type DeleteShippingRuleMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteShippingRuleMutation = { __typename?: "Mutation" } & {
  deleteShippingRule: { __typename?: "ShippingRule" } & Pick<
    ShippingRule,
    "id"
  >;
};

export const useDeleteShippingRuleMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation updateShippingRule(
    $args:UpdateShippingRuleInput!
){
    updateShippingRule(
        updateShippingRuleArgs:$args
    ){
        id
    }
}
    `);

  return useMutation<
    DeleteShippingRuleMutation["deleteShippingRule"],
    unknown,
    DeleteShippingRuleMutationVariables["id"]
  >(["create-shipping-rule"], async (id) => {
    const res = await client
      .setVariables<DeleteShippingRuleMutationVariables>({
        id,
      })
      .send<DeleteShippingRuleMutation>();

    return res.data.deleteShippingRule;
  });
};
