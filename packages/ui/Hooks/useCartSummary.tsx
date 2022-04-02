import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartSummaryItemData } from "types/market/CartSummary";
import {
  CartSummaryItemsState,
  CartSummaryOnlyProdcutsState,
  CartSummaryOnlyServicesState,
} from "../state";

export const useCartSummary = () => {
  const [cartSummaryItems, setCartSummaryItems] = useRecoilState(
    CartSummaryItemsState
  );
  const products = useRecoilValue(CartSummaryOnlyProdcutsState);
  const services = useRecoilValue(CartSummaryOnlyServicesState);

  function AddNewItem({ item, shop }: CartSummaryItemData) {
    const itemExists = cartSummaryItems.filter(
      (Item) => Item.item.id === item.id
    );
    if (itemExists.length > 0) {
      // item exists
      const restOfItems = cartSummaryItems.filter(
        ({ item: Item }) => Item.id !== item.id
      );

      const UpdatedItem: CartSummaryItemData = {
        ...itemExists[0],
        item: {
          ...itemExists[0].item,
          qty: itemExists[0].item.qty,
        },
      };
      // qty: itemExists[0].qty + 1,

      setCartSummaryItems([...restOfItems, UpdatedItem]);
    } else {
      setCartSummaryItems((state) => [...state, { item, shop }]);
    }
  }
  function ChangeQuantity(id: string, qty: number) {
    const itemExists = cartSummaryItems.filter((Item) => Item.item.id === id);
    if (itemExists.length > 0) {
      // item exists
      const restOfItems = cartSummaryItems.filter(
        (Item) => Item.item.id !== id
      );

      const UpdatedItem: CartSummaryItemData = {
        ...itemExists[0],
        item: {
          ...itemExists[0].item,
          qty,
        },
      };

      setCartSummaryItems([...restOfItems, UpdatedItem]);
    }
  }

  function RemoveItem(itemId: string) {
    setCartSummaryItems((state) =>
      state.filter((item) => item.item.id !== itemId)
    );
  }

  return {
    cartSummaryItems,
    products,
    services,
    AddNewItem,
    RemoveItem,
    ChangeQuantity,
  };
};
