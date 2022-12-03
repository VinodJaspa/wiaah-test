import { ShoppingCartItemType } from "api";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getMyShoppingCartQueryKey } from "ui";
import { ShoppingCartToggleState } from "ui";

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
export const useMutateShoppingCart = () => {
  const queryclient = useQueryClient();
  const { mutate } = useMutation(
    async (item: ShoppingCartItemType) => {
      return item;
    },
    {
      onSuccess: (data, vars) => {
        queryclient.setQueryData(
          getMyShoppingCartQueryKey(),
          (old?: ShoppingCartItemType[]) => {
            if (old) {
              return [...old, data];
            }
            return [data];
          }
        );
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

  function addShoppingCartItem(item: ShoppingCartItemType) {
    mutate(item);
  }

  return {
    OpenShoppingCart,
    closeShoppingCart,
    addShoppingCartItem,
  };
};
