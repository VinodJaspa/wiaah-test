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
                | "title"
                | "price"
                | "stock"
                | "thumbnail"
                | "isExternalShopping"
                | "vendor_external_link"
                | "id"
              >
            >;
            service?: Maybe<
              { __typename?: "Service" } & Pick<
                Service,
                "name" | "thumbnail" | "price" | "id"
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
        vendor_external_link
        id
      }
      service{
        name
        id
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
          id: "1",
          price: 45,
          stock: 0,
          thumbnail: getRandomImage(),
          title:[{langId:"en" , value:"product title"}],
          isExternalShopping: false,
          vendor_external_link: "http://",
        },
      })),
    };

    return mockRes;

    const res = await client.send<GetMyWishListQuery>();

    return res.data.MyWishlist;
  });
};
