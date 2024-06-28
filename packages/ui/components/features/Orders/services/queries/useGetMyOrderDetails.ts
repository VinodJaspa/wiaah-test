import { Order } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { Exact, Scalars } from "types";

export type GetOrderDetailsQueryVariables = Exact<{
  id: Scalars["String"];
}>;

type GetOrderDetailsQuery = { __typename?: "Query" } & {
  getOrder: { __typename?: "Order" } & Pick<Order, "id">;
};

export const useGetMyOrderDetails = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);
};
