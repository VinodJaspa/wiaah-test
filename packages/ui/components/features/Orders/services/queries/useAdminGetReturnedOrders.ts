import {
  AdminGetReturnedOrdersInput,
  Exact,
  Maybe,
  OrderItem,
  Product,
  Profile,
  ReturnedOrder,
  ShippingRule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetFilteredReturnOrdersQueryVariables = Exact<{
  args: AdminGetReturnedOrdersInput;
}>;

export type AdminGetFilteredReturnOrdersQuery = { __typename?: "Query" } & {
  adminGetReturnedOrders: Array<
    { __typename?: "ReturnedOrder" } & Pick<
      ReturnedOrder,
      "amount" | "reason"
    > & {
        orderItem: { __typename?: "OrderItem" } & Pick<OrderItem, "paid"> & {
            product?: Maybe<
              { __typename?: "Product" } & Pick<Product, "title" | "thumbnail">
            >;
            seller: { __typename?: "Account" } & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<Profile, "username">
              >;
            };
            buyer: { __typename?: "Account" } & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<Profile, "username">
              >;
            };
          };
      }
  >;
};

type args = AdminGetFilteredReturnOrdersQueryVariables["args"];
export const adminGetReturnedProductsQueryKey = (args: args) => [
  "admin-returned-orders",
  { args },
];

export const adminGetReturnedProductsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetFilteredReturnOrders(
  $args:AdminGetReturnedOrdersInput!
) {
  adminGetReturnedOrders(
    args:$args
  ){
    amount
    orderItem {
      paid
    	product{
        title
				thumbnail
      }
      seller {
        profile {
          username
        }
      }
      buyer {
        profile {
          username
        }
      }
      paid
    }
    reason
  }
}
    `);

  client.setVariables<AdminGetFilteredReturnOrdersQueryVariables>({ args });

  const res = await client.send<AdminGetFilteredReturnOrdersQuery>();

  return res.data.adminGetReturnedOrders;
};

export const useAdminGetReturnedProductsQuery = (args: args) =>
  useQuery(adminGetReturnedProductsQueryKey(args), () =>
    adminGetReturnedProductsFetcher(args)
  );
