import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { GetMyOrdersInput, Order, OrderStatus } from "@features/Orders/schema";
import { Account } from "@features/Accounts";

export type GetOrdersQueryVariables = Exact<{
  args: GetMyOrdersInput;
}>;

export type GetOrdersQuery = { __typename?: "Query" } & {
  getMyOrders: Array<
    { __typename?: "Order" } & Pick<Order, "id" | "buyerId"> & {
        buyer?: Maybe<{ __typename?: "Account" } & Pick<Account, "id">>;
        status: { __typename?: "OrderStatus" } & Pick<
          OrderStatus,
          "of" | "rejectReason"
        >;
      }
  >;
};

export const useGetMyOrdersQuery = (input: GetMyOrdersInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getOrders(
            $args:GetMyOrdersInput
        ){
            getMyOrders(
                getMyOrdersArgs:$args
            ){
                id
                buyerId
                buyer {
                    id
                }
                status {
                    of
                    rejectReason
                }
                
            }
        }    
    `);

  return useQuery(["get-my-orders"], async () => {
    const res = await client.send<GetOrdersQuery>();

    return res.data.getMyOrders;
  });
};
