import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getMyShoppingCartQueryKey } from "@UI";
import { ShoppingCartToggleState } from "@UI";
import { ShoppingCartItemType } from "@features/API";

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

type ShoppingCartItemInput = {
  itemType: ShoppingCartItemType;
  itemId: string;
  qty: number;
};

export const useMutateShoppingCart = () => {
  const queryclient = useQueryClient();
  const { mutate } = useMutation(
    async (item: ShoppingCartItemInput) => {
      return item;
    },
    {
      onSuccess: (data, vars) => {
        queryclient.setQueryData(
          getMyShoppingCartQueryKey(),
          (old?: ShoppingCartItemInput[]) => {
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

  function addShoppingCartItem(item: ShoppingCartItemInput) {
    mutate(item);
  }

  return {
    OpenShoppingCart,
    closeShoppingCart,
    addShoppingCartItem,
  };
};
