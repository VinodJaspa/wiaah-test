import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useQuery } from "react-query";
import { Product } from "@features/Products";
import { GetMyReturnedOrdersInput, Refund } from "@features/API";

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
      | "productId"
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
              productId
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
              fullAmount
          }
      }
    `);

  client.setVariables<GetReturnedOrdersQueryVariables>({
    args: input,
  });

  return useQuery(["my-returned-orders", { input }], async () => {
    const res = await client.send<GetReturnedOrdersQuery>();
    return res.data.getMyReturnedOrders;
  });
};
