import { Exact, Product, Scalars, Service, WishedItem } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetUserWishlistQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminGetUserWishlistQuery = { __typename?: "Query" } & {
  adminGetUserWishlist: Array<
    { __typename?: "WishedItem" } & Pick<
      WishedItem,
      "id" | "itemId" | "userId"
    > & {
        product: { __typename?: "Product" } & Pick<
          Product,
          "id" | "thumbnail" | "title" | "stock" | "price"
        >;
        service: { __typename?: "Service" } & Pick<
          Service,
          "id" | "thumbnail" | "title" | "price"
        >;
      }
  >;
};
type args = AdminGetUserWishlistQueryVariables["id"];
export const useAdminGetUserWishlist = (args: args) =>
  useQuery(["admin-get-user-wishlist", { args }], async () => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
    query adminGetUserWishlist($id:String!){
  adminGetUserWishlist(accountId:$id){
    id
    itemId
    userId
    product{
      id
      thumbnail
      title
      stock
      price
    }
    
    service {
      id
      thumbnail
      title
      price
    }
  }
}
    `);

    const res = await client
      .setVariables<AdminGetUserWishlistQueryVariables>({ id: args })
      .send<AdminGetUserWishlistQuery>();

    return res.data.adminGetUserWishlist;
  });
