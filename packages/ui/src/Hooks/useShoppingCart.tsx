import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getMyShoppingCartQueryKey } from "@UI";
import { ShoppingCartToggleState } from "@UI";
import {
  AddShoppingCartItemInput,
  Exact,
  ShoppingCartItemType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";

export const useShoppingCart = () => {
  const [ShoppingCartOpen, setShoppingCartOpen] = useRecoilState(
    ShoppingCartToggleState
  );

  function OpenShoppingCart() {
    setShoppingCartOpen(true);
  }

  function closeShoppingCart() {
    setShoppingCartOpen(false);
  }

  return {
    ShoppingCartOpen,
    OpenShoppingCart,
    closeShoppingCart,
  };
};

export type AddShoppingCartItemMutationVariables = Exact<{
  args: AddShoppingCartItemInput;
}>;

export type AddShoppingCartItemMutation = {
  __typename?: "Mutation";
  addProductToCart: { __typename?: "CartItem"; id: string };
};

type args = AddShoppingCartItemMutationVariables["args"];

export const useMutateShoppingCart = () => {
  const queryclient = useQueryClient();
  const { mutate } = useMutation(
    async (args: args) => {
      const client = createGraphqlRequestClient();
      const res = await client
        .setQuery(
          `
mutation addShoppingCartItem($args: AddShoppingCartItemInput!) {
  addProductToCart(addItemToCartArgs: $args) {
    id
  }
}
      `
        )
        .setVariables<AddShoppingCartItemMutationVariables>({ args })
        .send<AddShoppingCartItemMutation>();

      return res.data.addProductToCart;
    },
    {
      onSuccess: (data, vars) => {
        queryclient.invalidateQueries({
          queryKey: getMyShoppingCartQueryKey(),
        });
      },
    }
  );
  const setShoppingCartOpen = useSetRecoilState(ShoppingCartToggleState);

  function OpenShoppingCart() {
    setShoppingCartOpen(true);
  }

  function closeShoppingCart() {
    setShoppingCartOpen(false);
  }

  function addShoppingCartItem(item: args) {
    mutate(item);
  }

  return {
    OpenShoppingCart,
    closeShoppingCart,
    addShoppingCartItem,
  };
};
