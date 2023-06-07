import {
  AdminGetUserReturnedOrdersInput,
  Exact,
  Maybe,
  OrderItem,
  Product,
  ReturnedOrder,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetUserReturnedOrdersQueryVariables = Exact<{
  args: AdminGetUserReturnedOrdersInput;
}>;

export type AdminGetUserReturnedOrdersQuery = { __typename?: "Query" } & {
  adminGetUserReturnedOrders: Array<
    { __typename?: "ReturnedOrder" } & Pick<
      ReturnedOrder,
      "reason" | "status" | "amount" | "id"
    > & {
        orderItem: { __typename?: "OrderItem" } & Pick<OrderItem, "paid"> & {
            product?: Maybe<
              { __typename?: "Product" } & Pick<Product, "thumbnail" | "title">
            >;
          };
      }
  >;
};

type args = AdminGetUserReturnedOrdersQueryVariables["args"];
export const useAdminGetAccountReturnsQuery = (args: args) =>
  useQuery(["admin-get-user-returns", { args }], async () => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
    query adminGetUserReturnedOrders($args:AdminGetUserReturnedOrdersInput!){
  	adminGetUserReturnedOrders(args:$args){
       orderItem {
        product{
          thumbnail
          title
        }
        paid
      }
    reason
    status
    id
    amount
  }
}`);

    const res = await client
      .setVariables<AdminGetUserReturnedOrdersQueryVariables>({
        args,
      })
      .send<AdminGetUserReturnedOrdersQuery>();

    return res.data.adminGetUserReturnedOrders;
  });
