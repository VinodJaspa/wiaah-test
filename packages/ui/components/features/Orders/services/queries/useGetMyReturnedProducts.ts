import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import { Product, RefundType, OrderItem } from "@features/API";
import {
  GetMyReturnedOrdersInput,
  Refund,
  RefundStatusType,
} from "@features/API";
import { random } from "lodash";
import { getRandomImage } from "@UI/placeholder";

export type GetReturnedOrdersQueryVariables = Exact<{
  args: GetMyReturnedOrdersInput;
}>;

export type GetReturnedOrdersQuery = { __typename?: "Query" } & {
  getMyReturnedOrders: Array<
    { __typename?: "Refund" } & Pick<
      Refund,
      | "qty"
      | "amount"
      | "fullAmount"
      | "id"
      | "adminStatus"
      | "reason"
      | "rejectReason"
      | "requestedById"
      | "sellerId"
      | "type"
      | "status"
    > & {
      product: { __typename?: "Product" } & Pick<
        Product,
        "id" | "title" | "thumbnail"
      >;
      orderItem?: Maybe<
        { __typename?: "OrderItem" } & Pick<OrderItem, "paid">
      >;
    }
  >;
};

export const useGetMyReturnedProductsQuery = (
  input: GetMyReturnedOrdersInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
      query getReturnedOrders(
          $args:GetMyReturnedOrdersInput!
      ){
          getMyReturnedOrders(
              args:$args
          ){
              qty
              amount
              fullAmount
              id
              product{
                id
              }
          adminStatus
              reason
              rejectReason
              requestedById
              sellerId
              type
              status
              product {
                  id
                  title
                  thumbnail
              }
          orderItem{
            paid
          }
              fullAmount
          }
      }
    `);

  client.setVariables<GetReturnedOrdersQueryVariables>({
    args: input,
  });

  return useQuery(["my-returned-orders", { input }], async () => {
    // Deleted mockRes because graphql query will never invoke it
    const res = await client.send<GetReturnedOrdersQuery>();
    return res.data.getMyReturnedOrders;
  });
};
