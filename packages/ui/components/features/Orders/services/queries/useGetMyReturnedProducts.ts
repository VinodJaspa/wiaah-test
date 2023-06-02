import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useQuery } from "react-query";
import { Product, RefundType } from "@features/API";
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
    const mockRes: GetReturnedOrdersQuery["getMyReturnedOrders"] = [
      ...Array(5),
    ].map((v, i) => ({
      id: "test",
      amount: random(150, 500),
      fullAmount: false,
      orderItemId: "test",
      product: {
        id: "test",
        thumbnail: getRandomImage(),
        title: "test prod",
      },
      qty: 5,
      reason: "return  reason",
      requestedById: "test",
      sellerId: "test",
      status: RefundStatusType.Accept,
      type: RefundType.Credit,
      rejectReason: "reject reason",
    }));

    return mockRes;

    const res = await client.send<GetReturnedOrdersQuery>();
    return res.data.getMyReturnedOrders;
  });
};
