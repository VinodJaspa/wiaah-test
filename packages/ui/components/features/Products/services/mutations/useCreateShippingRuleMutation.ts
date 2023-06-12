import {
  CreateShippingRuleInput,
  Exact,
  ShippingCountry,
  ShippingDeliveryTimeRange,
  ShippingRule,
  ShippingType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type CreateShippingRuleMutationVariables = Exact<{
  args: CreateShippingRuleInput;
}>;

export type CreateShippingRuleMutation = {
  __typename?: "Mutation";
  createShippingRule: {
    __typename?: "ShippingRule";
    cost: number;
    id: string;
    name: string;
    sellerId: string;
    shippingType: ShippingType;
    deliveryTimeRange: {
      __typename?: "ShippingDeliveryTimeRange";
      from: number;
      to: number;
    };
  };
};

export const useCreateShippingRulesMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation createShippingRule($args: CreateShippingRuleInput!) {
  createShippingRule(createShippingRuleArgs: $args) {
    cost
    id
    name
    deliveryTimeRange {
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
  >(async (args) => {
    const res = await client
      .setVariables<CreateShippingRuleMutationVariables>({
        args,
      })
      .send<CreateShippingRuleMutation>();

    return res.data.createShippingRule;
  });
};
