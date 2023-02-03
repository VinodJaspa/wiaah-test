import { AddWishlistItemInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AddItemToWishlistMutationVariables = Exact<{
  args: AddWishlistItemInput;
}>;

export type AddItemToWishlistMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "AddWishlistItem"
>;

export const useAddItemToWishlistMutation = () => {
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
    AddItemToWishlistMutationVariables["args"]
  >(["add-wishlist-item"], async (args) => {
    const res = await client
      .setVariables<AddItemToWishlistMutationVariables>({
        args,
      })
      .send<AddItemToWishlistMutation>();

    return res.data.AddWishlistItem;
  });
};
