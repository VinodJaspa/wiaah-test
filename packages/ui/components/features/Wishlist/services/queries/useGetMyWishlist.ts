import {
  Exact,
  Maybe,
  Product,
  Service,
  Wishlist,
  WishlistItem,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyWishListQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyWishListQuery = { __typename?: "Query" } & {
  MyWishlist: { __typename?: "Wishlist" } & Pick<Wishlist, "id" | "ownerId"> & {
      wishedItems: Array<
        { __typename?: "WishlistItem" } & Pick<
          WishlistItem,
          "itemId" | "itemType"
        > & {
            product?: Maybe<
              { __typename?: "Product" } & Pick<
                Product,
                "title" | "price" | "stock" | "thumbnail"
              >
            >;
            service?: Maybe<
              { __typename?: "Service" } & Pick<
                Service,
                "title" | "thumbnail" | "price"
              >
            >;
          }
      >;
    };
};

export const useGetMyWishlistQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyWishList {
	MyWishlist {
    id
    ownerId
    wishedItems{
      itemId
      itemType
      product{
        title
        price
        stock
        thumbnail
      }
      service{
        title
        thumbnail
        price
      }
    }
  }
}
    `);

  return useQuery(["get-my-wishlist"], async () => {
    const res = await client.send<GetMyWishListQuery>();

    return res.data.MyWishlist;
  });
};
