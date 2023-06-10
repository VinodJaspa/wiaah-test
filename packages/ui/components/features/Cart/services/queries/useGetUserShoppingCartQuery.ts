import { createGraphqlRequestClient } from "api";
import {
  CartItem,
  Exact,
  Maybe,
  Product,
  Scalars,
  Service,
} from "@features/API";
import { useQuery } from "react-query";

export type GetShoppingCartItemQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetShoppingCartItemQuery = { __typename?: "Query" } & {
  getUserShoppingCartItems: Array<
    { __typename?: "CartItem" } & Pick<
      CartItem,
      | "checkin"
      | "checkout"
      | "color"
      | "guests"
      | "id"
      | "itemId"
      | "itemType"
      | "ownerId"
      | "size"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<
            Product,
            "price" | "title" | "thumbnail"
          >
        >;
        service?: Maybe<
          { __typename?: "Service" } & Pick<
            Service,
            "duration" | "name" | "thumbnail" | "price"
          >
        >;
      }
  >;
};

type args = GetShoppingCartItemQueryVariables;

export const getUserShopppingCartItemsQueryKey = (args: args) => [
  "get-user-shopping-cart",
  { args },
];

export const getUserShoppingCartItemsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getShoppingCartItem($userId:String!) {
  	getUserShoppingCartItems(userId:$userId){
        checkin
        checkout
        color
        guests
        id
        itemId
        itemType
        ownerId
        size
        product {
        price
        title
        thumbnail
        }
        service {
        duration
        name
        thumbnail
        price
        }
    }
}
    `
    )
    .setVariables<GetShoppingCartItemQueryVariables>(args)
    .send<GetShoppingCartItemQuery>();

  return res.data.getUserShoppingCartItems;
};

export const useGetUserShoppingCartItemsQuery = (args: args) => {
  return useQuery(getUserShopppingCartItemsQueryKey(args), () =>
    getUserShoppingCartItemsQueryFetcher(args)
  );
};
