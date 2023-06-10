import {
  Exact,
  GetFilteredOrdersInput,
  Maybe,
  Order,
  OrderStatus,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetOrdersQueryVariables = Exact<{
  args: GetFilteredOrdersInput;
}>;

export type AdminGetOrdersQuery = { __typename?: "Query" } & {
  getFilteredOrders: Array<
    { __typename?: "Order" } & Pick<
      Order,
      "id" | "sellerId" | "buyerId" | "paid" | "createdAt"
    > & {
        status: { __typename?: "OrderStatus" } & Pick<OrderStatus, "of">;
        buyer?: Maybe<
          { __typename?: "Account" } & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "username">
            >;
          }
        >;
        seller?: Maybe<
          { __typename?: "Account" } & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "username">
            >;
          }
        >;
      }
  >;
};

type args = AdminGetOrdersQueryVariables["args"];

export const adminGetOrdersQueryKey = (args: args) => [
  "admin-get-orders",
  { args },
];

export const adminGetOrdersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetOrders(
  $args:GetFilteredOrdersInput!
){
  getFilteredOrders(args:$args){
    id
    sellerId
    buyerId
    paid
    createdAt
    status {
      of
    }
    buyer {
      profile{
        username
      }
    }
    seller {
      profile{
        username
      }
    }
  }
}
  `);

  const res = await client
    .setVariables<AdminGetOrdersQueryVariables>({ args })
    .send<AdminGetOrdersQuery>();

  return res.data.getFilteredOrders;
};

export const useAdminGetOrdersQuery = (args: args) =>
  useQuery(adminGetOrdersQueryKey(args), () =>
    adminGetOrdersQueryFetcher(args)
  );
