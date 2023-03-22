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
    const mockRes: GetMyShippingAddressQuery["getMyShippingAddress"] = [
      ...Array(2),
    ].map((v, i) => ({
      id: "test",
      firstname: "first name",
      lastname: "frist name",
      location: {
        address: "3069 Geraldine Lane",
        city: "New York",
        country: "country",
        lat: 40.73962045,
        long: -74.021118,
        state: "NY",
      },
      instractions: "",
      phone: "646-366-9896",
      zipCode: "10036",
    }));

    return mockRes;
    const res = await client.send<GetMyShippingAddressQuery>();

    return res.data.getMyShippingAddress;
  });
};
