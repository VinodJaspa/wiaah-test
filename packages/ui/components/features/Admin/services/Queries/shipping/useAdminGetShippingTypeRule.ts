import {
  Exact,
  Scalars,
  ShippingRuleGeoZone,
  ShippingTypeRule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetShippingTypeRuleQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetShippingTypeRuleQuery = { __typename?: "Query" } & {
  getShippingTypeRule: { __typename?: "ShippingTypeRule" } & Pick<
    ShippingTypeRule,
    "description" | "id" | "name" | "type"
  > & {
    zones: Array<
      { __typename?: "ShippingRuleGeoZone" } & Pick<
        ShippingRuleGeoZone,
        "country" | "id" | "shippingTypeRuleId" | "zone"
      >
    >;
  };
};

export const useAdminGetShippingTypeRule = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getShippingTypeRule($id:String!){
  getShippingTypeRule(id:$id){
    description
    id
    name
    type
    zones{
      country
      id
      shippingTypeRuleId
      zone
    }
  }
}
  `);

  return useQuery(["admin-get-shipping-type-rule"], async () => {
    const res = await client
      .setVariables<GetShippingTypeRuleQueryVariables>({
        id,
      })
      .send<GetShippingTypeRuleQuery>();

    return res.data.getShippingTypeRule;
  });
};
