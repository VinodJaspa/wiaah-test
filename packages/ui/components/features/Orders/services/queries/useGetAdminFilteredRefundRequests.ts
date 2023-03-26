import {
  Account,
  Exact,
  GetFilteredRefundsInput,
  Maybe,
  OrderItem,
  Product,
  Refund,
  RefundStatusType,
} from "@features/API";
import { isDev, randomNum } from "@UI/../utils/src";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetRefundRequestsQueryVariables = Exact<{
  args: GetFilteredRefundsInput;
}>;

export type AdminGetRefundRequestsQuery = { __typename?: "Query" } & {
  getRefundRequests: Array<
    { __typename?: "Refund" } & Pick<
      Refund,
      "id" | "amount" | "createdAt" | "reason" | "status" | "updatedAt"
    > & {
        orderItem?: Maybe<
          { __typename?: "OrderItem" } & Pick<OrderItem, "id"> & {
              seller: { __typename?: "Account" } & Pick<
                Account,
                "firstName" | "lastName"
              >;
              buyer: { __typename?: "Account" } & Pick<
                Account,
                "firstName" | "lastName"
              >;
            }
        >;
        product: { __typename?: "Product" } & Pick<Product, "title">;
      }
  >;
};

type args = AdminGetRefundRequestsQueryVariables["args"];
export const getAdminFilteredRefundRequestsQueryKey = (args: args) => [
  "admin-filtered-refund-requests",
  { args },
];

export const getAdminFilteredRefundRequestsQueryFetcher = async (
  args: args
) => {
  const client = createGraphqlRequestClient();

  if (isDev) {
    const mockRes: AdminGetRefundRequestsQuery["getRefundRequests"] = [
      ...Array(10),
    ].map((_, i) => ({
      amount: randomNum(2000),
      createdAt: new Date().toString(),
      id: "id" + i,
      product: {
        title: "prod" + i,
      },
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
      status:
        Object.values(RefundStatusType)[
          i % Object.values(RefundStatusType).length
        ],
      updatedAt: new Date().toString(),
      orderItem: {
        buyer: {
          firstName: "first",
          lastName: "last",
        },
        id: "orderid-" + i,
        seller: {
          firstName: "first",
          lastName: "last",
        },
      },
    }));

    return mockRes;
  }

  const res = await client
    .setQuery(
      `
query adminGetRefundRequests($args:GetFilteredRefundsInput!){
  getRefundRequests(args:$args) {
    id
    amount
    createdAt
    orderItem{
      id
      seller{
        firstName
        lastName
      }
      buyer {
        firstName
        lastName
      }
    }
    reason
    product{
      title
    }
    status
    updatedAt
  }
}
  `
    )
    .setVariables<AdminGetRefundRequestsQueryVariables>({
      args,
    })
    .send<AdminGetRefundRequestsQuery>();

  return res.data.getRefundRequests;
};

export const useGetAdminFilteredRefundRequests = (args: args) =>
  useQuery(getAdminFilteredRefundRequestsQueryKey(args), () =>
    getAdminFilteredRefundRequestsQueryFetcher(args)
  );
