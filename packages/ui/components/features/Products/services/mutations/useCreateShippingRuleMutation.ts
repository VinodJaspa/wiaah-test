import {
  CreateShippingRuleInput,
  Exact,
  ShippingCountry,
  ShippingDeliveryTimeRange,
  ShippingRule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type CreateShippingRuleMutationVariables = Exact<{
  args: CreateShippingRuleInput;
}>;

export type CreateShippingRuleMutation = { __typename?: "Mutation" } & {
  createShippingRule: { __typename?: "ShippingRule" } & Pick<
    ShippingRule,
    "cost" | "id" | "name" | "sellerId" | "shippingType"
  > & {
      countries: Array<
        { __typename?: "ShippingCountry" } & Pick<
          ShippingCountry,
          "code" | "name"
        >
      >;
      deliveryTimeRange: { __typename?: "ShippingDeliveryTimeRange" } & Pick<
        ShippingDeliveryTimeRange,
        "from" | "to"
      >;
    };
};

export const useCreateShippingRulesMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation createShippingRule(
        $args:CreateShippingRuleInput!
    ){
        createShippingRule(
            createShippingRuleArgs:$args
        ){
            cost
            id
            name
            countries{
                code
                name
            }
            deliveryTimeRange{
                from
                to
            }
            sellerId
            shippingType
        }
    }
    `);

  return useMutation<
    CreateShippingRuleMutation["createShippingRule"],
    unknown,
    CreateShippingRuleMutationVariables["args"]
  >(["create-shipping-rule"], async (args) => {
    const res = await client
      .setVariables<CreateShippingRuleMutationVariables>({
        args,
      })
      .send<CreateShippingRuleMutation>();

    return res.data.createShippingRule;
  });
};
