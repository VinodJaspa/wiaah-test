import {
  Exact,
  ShippingCountry,
  ShippingDeliveryTimeRange,
  ShippingRule,
  ShippingType,
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
    const mockRes: GetMyShippingSettingsQuery["getMyShippingRules"] = [
      ...Array(5),
    ].map((v, i) => ({
      cost: 50,
      countries: [{ code: "US", name: "United States" }],
      deliveryTimeRange: { from: 4, to: 8 },
      id: "test",
      name: "USA Shipping",
      sellerId: "test",
      shippingType: ShippingType.Paid,
    }));

    return mockRes;

    const res = await client.send<GetMyShippingSettingsQuery>();

    return res.data.getMyShippingRules;
  });
};
