import {
  Account,
  Exact,
  Maybe,
  Order,
  OrderItem,
  Product,
  Profile,
  Refund,
  RefundStatusType,
  Scalars,
  ShippingAddress,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { isDev } from "utils";

export type GetAdminRefundRequestQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetAdminRefundRequestQuery = { __typename?: "Query" } & {
  adminGetRefundRequest: { __typename?: "Refund" } & Pick<
    Refund,
    | "amount"
    | "fullAmount"
    | "id"
    | "orderItemId"
    | "createdAt"
    | "opened"
    | "reason"
    | "status"
  > & {
      orderItem?: Maybe<
        { __typename?: "OrderItem" } & Pick<OrderItem, "qty"> & {
            buyer: { __typename?: "Account" } & Pick<Account, "email"> & {
                profile?: Maybe<
                  { __typename?: "Profile" } & Pick<Profile, "username">
                >;
              };
            order: { __typename?: "Order" } & Pick<
              Order,
              "id" | "createdAt"
            > & {
                shippingAddress: { __typename?: "ShippingAddress" } & Pick<
                  ShippingAddress,
                  "firstname" | "lastname" | "phone"
                >;
              };
            product?: Maybe<
              { __typename?: "Product" } & Pick<Product, "title" | "brand">
            >;
            seller: { __typename?: "Account" } & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<Profile, "username">
              >;
            };
          }
      >;
    };
};

type args = GetAdminRefundRequestQueryVariables["id"];
export const getAdminRefundQueryKey = (args: args) => [
  "admin-returned-order",
  { args },
];

export const getAdminRefundQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getAdminRefundRequest($id:String!){
  adminGetRefundRequest(
    id:$id
  ){
    amount
    fullAmount
    id
    orderItemId
    createdAt
    orderItemId
    orderItem{
      buyer{
        profile{
          username
        }
        email
      }
      order{
        id
        createdAt
        shippingAddress{
          firstname
          lastname
          phone
        }
      }
      product{
        title
        brand
      }
      seller{
        profile{
          username
        }
      }
      qty
    }
    opened
    reason
    status
  }
}
    `);

  if (isDev) {
    const mockRes: GetAdminRefundRequestQuery["adminGetRefundRequest"] = {
      amount: 65,
      createdAt: new Date().toString(),
      fullAmount: true,
      opened: true,
      id: "test",
      orderItemId: "test",
      reason: "mock refund reason for product refund request",
      status: RefundStatusType.Rejected,
      orderItem: {
        qty: 4,
        seller: {
          profile: {
            username: "seller name",
          },
        },
        buyer: {
          email: "buyer@email.com",
          profile: {
            username: "buyer name",
          },
        },
        order: {
          createdAt: new Date().toString(),
          id: "test",
          shippingAddress: {
            firstname: "first name",
            lastname: "last name",
            phone: "132-456-798",
          },
        },
        product: {
          brand: "Product Model",
          title: [{langId:"en", value:"mock product title"}],
        },
      },
    };

    return mockRes;
  }

  const res = await client
    .setVariables<GetAdminRefundRequestQueryVariables>({
      id: args,
    })
    .send<GetAdminRefundRequestQuery>();

  return res.data.adminGetRefundRequest;
};

export const useGetAdminReturnedOrder = (args: args) =>
  useQuery(getAdminRefundQueryKey(args), () =>
    getAdminRefundQueryFetcher(args)
  );
