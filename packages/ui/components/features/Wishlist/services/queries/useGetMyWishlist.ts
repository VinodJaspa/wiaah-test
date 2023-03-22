import {
  Exact,
  Maybe,
  Product,
  Service,
  Wishlist,
  WishlistItem,
  WishlistItemType,
} from "@features/API";
import { getRandomImage } from "@UI/placeholder";
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
    const mockRes: GetMyWishListQuery["MyWishlist"] = {
      id: "test",
      ownerId: "test",
      wishedItems: [...Array(5)].map((v, i) => ({
        itemId: i.toString(),
        itemType: WishlistItemType.Product,
        product: {
          price: 45,
          stock: 0,
          thumbnail: getRandomImage(),
          title: "product title",
        },
      })),
    };

    return mockRes;

    const res = await client.send<GetMyWishListQuery>();

    return res.data.MyWishlist;
  });
};
