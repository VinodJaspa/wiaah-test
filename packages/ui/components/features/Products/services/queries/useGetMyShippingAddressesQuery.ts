import { Exact, Location, ShippingAddress } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetMyShippingAddressQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyShippingAddressQuery = { __typename?: "Query" } & {
  getMyShippingAddress: Array<
    { __typename?: "ShippingAddress" } & Pick<
      ShippingAddress,
      "id" | "instractions" | "phone" | "ownerId"
    > & {
        location: { __typename?: "Location" } & Pick<
          Location,
          "address" | "city" | "country" | "state"
        >;
      }
  >;
};

export const useGetMyShippingAddressesQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`    
query getMyShippingAddress{
  getMyShippingAddress {
    id
    location{
      address
      city
      country
      state
    }
    ownerId
  }
}
    `);

  return useQuery(["my-shipping-address"], async () => {
    const res = await client.send<GetMyShippingAddressQuery>();

    return res.data.getMyShippingAddress;
  });
};
