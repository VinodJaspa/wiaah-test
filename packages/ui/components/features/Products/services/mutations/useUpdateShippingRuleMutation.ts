import {
  Exact,
  ShippingRule,
  UpdateShippingRuleInput,
} from "../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type UpdateShippingRuleMutationVariables = Exact<{
  args: UpdateShippingRuleInput;
}>;

export type UpdateShippingRuleMutation = { __typename?: "Mutation" } & {
  updateShippingRule: { __typename?: "ShippingRule" } & Pick<
    ShippingRule,
    "id"
  >;
};

export const useUpdateShippingRuleMutation = () => {
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
    UpdateShippingRuleMutation["updateShippingRule"],
    unknown,
    UpdateShippingRuleMutationVariables["args"]
  >(["create-shipping-rule"], async (args) => {
    const res = await client
      .setVariables<UpdateShippingRuleMutationVariables>({
        args,
      })
      .send<UpdateShippingRuleMutation>();

    return res.data.updateShippingRule;
  });
};
