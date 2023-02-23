import {
  Exact,
  GetSalesDurningPeriodInput,
  Location,
  Maybe,
  OrderItem,
  Product,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetSalesDurningPeriodQueryVariables = Exact<{
  args: GetSalesDurningPeriodInput;
}>;

export type AdminGetSalesDurningPeriodQuery = { __typename?: "Query" } & {
  getSalesDurningPeriod: Array<
    { __typename?: "OrderItem" } & Pick<
      OrderItem,
      "qty" | "createdAt" | "status" | "paid"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<Product, "title" | "thumbnail">
        >;
        buyer: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username">
          >;
        };
        order: { __typename?: "Order" } & {
          shippingAddress: { __typename?: "ShippingAddress" } & {
            location: { __typename?: "Location" } & Pick<
              Location,
              "address" | "city" | "country" | "state"
            >;
          };
        };
      }
  >;
};

type args = AdminGetSalesDurningPeriodQueryVariables["args"];

export const adminGetSalesByPeriodQueryKey = (args: args) => [
  "admin-sales-period",
  { args },
];

export const adminGetSalesByPeriodQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetSalesDurningPeriod(
  $args:GetSalesDurningPeriodInput!
){
  getSalesDurningPeriod(
    args:$args
  ){
    product {
      title
    }
    qty
    buyer {
      profile{
        username
      }
    }
    order {
      shippingAddress{
        location{
          address
          city
          country
          state
        }
      }
    }
    status
    paid
  }
}
    `);

  const res = await client
    .setVariables<AdminGetSalesDurningPeriodQueryVariables>({ args })
    .send<AdminGetSalesDurningPeriodQuery>();

  return res.data.getSalesDurningPeriod;
};

export const useAdminGetSalesByPeriod = (args: args) =>
  useQuery(adminGetSalesByPeriodQueryKey(args), async () =>
    adminGetSalesByPeriodQueryFetcher(args)
  );
