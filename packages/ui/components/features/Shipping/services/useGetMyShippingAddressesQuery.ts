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
      "firstname" | "id" | "instractions" | "lastname" | "phone" | "zipCode"
    > & {
        location: { __typename?: "Location" } & Pick<
          Location,
          "address" | "city" | "country" | "lat" | "long" | "state"
        >;
      }
  >;
};

export const useGetMyShippingAddressesQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`    
query getMyShippingAddress{
  getMyShippingAddress {
    firstname
    id
    instractions
    lastname
    phone
    
    location{
      address
      city
      country
      lat
      long
      state
    }
    zipCode
  }
}
    `);

  return useQuery(["my-shipping-address"], async () => {
    const res = await client.send<GetMyShippingAddressQuery>();

    return res.data.getMyShippingAddress;
  });
};
