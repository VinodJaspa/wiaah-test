import { Exact, Mutation, UpdateShippingTypeRuleInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type UpdateShippingTypeRuleMutationVariables = Exact<{
  args: UpdateShippingTypeRuleInput;
}>;

export type UpdateShippingTypeRuleMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateShippingTypeRule"
>;

export const useAdminUpdateShippingRuleTypeMutation = () =>
  useMutation<
    boolean,
    unknown,
    UpdateShippingTypeRuleMutationVariables["args"]
  >(["admin-update-shipping"], async (data) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation updateShippingTypeRule($args:UpdateShippingTypeRuleInput!){
  updateShippingTypeRule(args:$args)
}
    `);

    const res = await client
      .setVariables<UpdateShippingTypeRuleMutationVariables>({
        args: data,
      })
      .send<UpdateShippingTypeRuleMutation>();

    return res.data.updateShippingTypeRule;
  });
