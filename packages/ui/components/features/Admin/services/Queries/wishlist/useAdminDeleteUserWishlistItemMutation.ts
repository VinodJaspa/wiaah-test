import { Exact, Mutation, Product, Scalars, WishedItem } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation, useQuery } from "react-query";

export type AdminDeleteUserWishlistItemMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminDeleteUserWishlistItemMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "adminDeleteUserWishlistItem">;

export const useAdminDeleteUserWishlistItem = () =>
  useMutation<boolean, unknown, string>(
    ["admin-get-user-wishlist"],
    async (id) => {
      const client = createGraphqlRequestClient();

      client.setQuery(`
mutation adminDeleteUserWishlistItem($id:String!){
  adminDeleteUserWishlistItem(accountId:$id)
}`);

      const res = await client
        .setVariables<AdminDeleteUserWishlistItemMutationVariables>({ id: id })
        .send<AdminDeleteUserWishlistItemMutation>();

      return res.data.adminDeleteUserWishlistItem;
    }
  );
