import React from "react";
import { useRecoilState } from "recoil";
import { ShoppingCartToggleState } from "../state";

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
