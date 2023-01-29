import { createGraphqlRequestClient } from "@UI/../api";

export type GetOrderDetailsQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetOrderDetailsQuery = { __typename?: "Query" } & {
  getOrder: { __typename?: "Order" } & Pick<Order, "id">;
};

export const useGetMyOrderDetails = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);
};
