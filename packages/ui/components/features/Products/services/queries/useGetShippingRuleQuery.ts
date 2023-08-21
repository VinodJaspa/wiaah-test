import { Exact, ShippingDestination, ShippingType } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetShippingRuleByIdQueryVariables = Exact<{
  id: string;
}>;

export type GetShippingRuleByIdQuery = {
  __typename?: "Query";
  getShippingRuleById: {
    __typename?: "ShippingRule";
    id: string;
    cost: number;
    destination: ShippingDestination;
    name: string;
    shippingCompanyName: string;
    shippingType: ShippingType;
    deliveryTimeRange: {
      __typename?: "ShippingDeliveryTimeRange";
      from: number;
      to: number;
    };
  };
};

export const useGetShippingRuleById = (
  args: GetShippingRuleByIdQueryVariables,
  options?: UseQueryOptions<
    GetShippingRuleByIdQueryVariables,
    any,
    GetShippingRuleByIdQuery["getShippingRuleById"]
  >
) =>
  useQuery<
    GetShippingRuleByIdQueryVariables,
    any,
    GetShippingRuleByIdQuery["getShippingRuleById"]
  >(
    ["shipping-rule", { args }],
    async () => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
query getShippingRuleById(
    $id:String!
){
    getShippingRuleById(
        id:$id
    ){
        id
        cost
        destination
        name
        deliveryTimeRange{
            from
            to
        }
        shippingCompanyName
        shippingType
    }
}
    `
        )
        .setVariables<GetShippingRuleByIdQueryVariables>(args)
        .send<GetShippingRuleByIdQuery>();

      return res.data.getShippingRuleById;
    },
    options
  );
