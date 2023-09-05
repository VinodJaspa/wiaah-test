import {
  Exact,
  GetShippingRulesInput,
  ShippingDestination,
  ShippingType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { isDev } from "utils";

export type GetMyShippingSettingsQueryVariables = Exact<{
  args: GetShippingRulesInput;
}>;

export type GetMyShippingSettingsQuery = {
  __typename?: "Query";
  getMyShippingRules: Array<{
    __typename?: "ShippingRule";
    cost: number;
    id: string;
    name: string;
    destination: ShippingDestination;
    shippingCompanyName: string;
    sellerId: string;
    shippingType: ShippingType;
    listing: number;
    deliveryTimeRange: {
      __typename?: "ShippingDeliveryTimeRange";
      from: number;
      to: number;
    };
  }>;
};

export const useGetMyShippingRules = (
  args: GetMyShippingSettingsQueryVariables["args"]
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyShippingSettings(
    $args:GetShippingRulesInput!
) {
  getMyShippingRules(
      args:$args
  ) {
    cost
    deliveryTimeRange {
      from
      to
    }
    id
    name
    destination
    shippingCompanyName
    sellerId
    shippingType
    listing
  }
}
    `);

  client.setVariables({});

  return useQuery(["shipping-rules", { args }], async () => {
    if (isDev) {
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
        listing: 46,
        destination: ShippingDestination.Local,
        shippingCompanyName: "company name",
      }));

      return mockRes;
    }

    const res = await client
      .setVariables<GetMyShippingSettingsQueryVariables>({ args })
      .send<GetMyShippingSettingsQuery>();

    return res.data.getMyShippingRules;
  });
};
