import {
  Exact,
  ShippingCountry,
  ShippingDeliveryTimeRange,
  ShippingRule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyShippingSettingsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyShippingSettingsQuery = { __typename?: "Query" } & {
  getMyShippingRules: Array<
    { __typename?: "ShippingRule" } & Pick<
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
      }
  >;
};

export const useGetMyShippingRules = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getMyShippingSettings{
            getMyShippingRules {
                cost
                countries{
                    code
                    name
                }
                deliveryTimeRange{
                    from
                    to
                }
                id
                name
                sellerId
                shippingType
            }
        }
    `);

  client.setVariables({});

  return useQuery(["shipping-rules"], async () => {
    const res = await client.send<GetMyShippingSettingsQuery>();

    return res.data.getMyShippingRules;
  });
};
