import {
  BillingAddress,
  Exact,
  Maybe,
  Order,
  OrderStatus,
  OrderStatusEnum,
  Scalars,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { useQuery } from "react-query";

export type GetLatestOrdersQueryVariables = Exact<{
  take?: Maybe<Scalars["Int"]["input"]>;
}>;

export type GetLatestOrdersQuery = { __typename?: "Query" } & {
  getLatestOrders: Array<
    { __typename?: "Order" } & Pick<Order, "createdAt" | "paid"> & {
      billing: { __typename?: "BillingAddress" } & Pick<
        BillingAddress,
        "firstName"
      >;
      status: { __typename?: "OrderStatus" } & Pick<OrderStatus, "of">;
    }
  >;
};

export const AdminGetLatestOrdersQueryKey = (
  args: GetLatestOrdersQueryVariables["take"]
) => ["get-latest-orders", { args }];

export const AdminGetLatestOrdersQueryFetcher = async (
  args: GetLatestOrdersQueryVariables["take"]
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`query GetLatestOrders(
  $take:Int
){
  getLatestOrders(take:$take){
 		createdAt
    billing {
      firstName
    }
    paid
    status{
      of
    }
  }
}`);

  const res = await client
    .setVariables<GetLatestOrdersQueryVariables>({ take: args })
    .send<GetLatestOrdersQuery>();

  return res.data.getLatestOrders;
};

export const useAdminGetLatestOrdersQuery = (
  args: GetLatestOrdersQueryVariables["take"]
) => {
  return useQuery(AdminGetLatestOrdersQueryKey(args), () => {
    if (isDev) {
      const res: GetLatestOrdersQuery["getLatestOrders"] = [...Array(10)].map(
        () => ({
          billing: {
            firstName: getRandomName().firstName,
          },
          createdAt: new Date().toString(),
          paid: randomNum(156),
          status: {
            of: OrderStatusEnum.Paid,
          },
        })
      );
      return res;
    }
    return AdminGetLatestOrdersQueryFetcher(args);
  });
};
