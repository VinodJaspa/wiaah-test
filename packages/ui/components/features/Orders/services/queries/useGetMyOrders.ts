import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Account,
  GetMyOrdersInput,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Profile,
  ShippingAddress,
  ShippingRule,
} from "@features/API";

export type GetOrdersQueryVariables = Exact<{
  args: GetMyOrdersInput;
}>;

export type GetOrdersQuery = { __typename?: "Query" } & {
  getMyOrders: Array<
    { __typename?: "Order" } & Pick<
      Order,
      "id" | "buyerId" | "sellerId" | "createdAt" | "updatedAt" | "paid"
    > & {
        buyer?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile: Pick<Profile, "id" | "username" | "photo">;
            }
        >;
        seller?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile: Pick<Profile, "id" | "username" | "photo">;
            }
        >;
        items: Array<
          { __typename?: "OrderItem" } & Pick<OrderItem, "id" | "qty"> & {
              product?: Maybe<
                { __typename?: "Product" } & Pick<
                  Product,
                  "id" | "title" | "price" | "thumbnail"
                >
              >;
            }
        >;
        shippingAddress: { __typename?: "ShippingAddress" } & Pick<
          ShippingAddress,
          "id" | "ownerId" | "location"
        >;
        shipping: { __typename?: "ShippingMethod" } & Pick<
          ShippingRule,
          "id" | "deliveryTimeRange" | "name" | "cost"
        >;
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
                sellerId
                paid
                shippingAddress {
                  id
                  ownerId
                  location {
                    lat
                    long
                    address
                    country
                    city
                    state
                  }
                }
                shipping {
                  id
                  name
                  cost
                  deliveryTimeRange{
                    from
                    to
                  }
                }
                seller {
                  id
                  profile{
                    id
                    username
                    photo
                  }
                }
                shipping {
                  id
                }
                shippingAddress {
                  id
                }
                buyer {
                  profile{
                   id
                   username
                   photo 
                  }
                    id
                }
                status {
                    of
                    rejectReason
                }
                items{
                  id
                  qty
                  product{
                    id
                    title
                    thumbnail
                    price
                  }
                }
            }
        }    
    `);

  client.setVariables<GetOrdersQueryVariables>({
    args: input,
  });

  return useQuery(["get-my-orders"], async () => {
    const res = await client.send<GetOrdersQuery>();

    return res.data.getMyOrders;
  });
};
