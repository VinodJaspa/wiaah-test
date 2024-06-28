import { Exact, Mutation } from "@features/API";
import { RemoveWishlistItemInput } from "@features/API/gql/generated";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type RemoveWishListITemMutationVariables = Exact<{
  args: RemoveWishlistItemInput;
}>;

export type RemoveWishListITemMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeWishlistItem"
>;

export const useRemoveItemFromWishlistMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation addItemToWishlist(
  	$args:AddWishlistItemInput!
){
  	AddWishlistItem(addWishlistItemInput:$args)
}
    `);

  return useMutation<
    boolean,
    unknown,
    RemoveWishListITemMutationVariables["args"]
  >(["add-wishlist-item"], async (args) => {
    const res = await client
      .setVariables<RemoveWishListITemMutationVariables>({
        args,
      })
      .send<RemoveWishListITemMutation>();

    return res.data.removeWishlistItem;
  });
};
