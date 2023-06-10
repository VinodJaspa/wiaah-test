import {
  Exact,
  ShippingCountry,
  ShippingDeliveryTimeRange,
  ShippingRule,
  ShippingType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { isDev } from "utils";

export type GetMyShippingSettingsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyShippingSettingsQuery = {
  __typename?: "Query";
  getMyShippingRules: Array<{
    __typename?: "ShippingRule";
    cost: number;
    id: string;
    name: string;
    sellerId: string;
    shippingType: ShippingType;
    listing: number;
    countries: Array<{ __typename?: "ShippingCountry"; code: string }>;
    deliveryTimeRange: {
      __typename?: "ShippingDeliveryTimeRange";
      from: number;
      to: number;
    };
  }>;
};

export const useGetMyShippingRules = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyShippingSettings {
  getMyShippingRules {
    cost
    countries {
      code
    }
    deliveryTimeRange {
      from
      to
    }
    id
    name
    sellerId
    shippingType
    listing
  }
}


    `);

  client.setVariables({});

  return useQuery(["shipping-rules"], async () => {
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
      }));

      return mockRes;
    }

    const res = await client.send<GetMyShippingSettingsQuery>();

    return res.data.getMyShippingRules;
  });
};
