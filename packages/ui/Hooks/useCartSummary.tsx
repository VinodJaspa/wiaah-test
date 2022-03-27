import React from "react";
import { useRecoilState } from "recoil";
import { CartSummaryItem } from "types/market/CartSummary";
import { CartSummaryItemsState } from "../state";

export const useCartSummary = () => {
  const [cartSummaryItems, setCartSummaryItems] = useRecoilState(
    CartSummaryItemsState
  );
  function AddNewItem(item: CartSummaryItem) {
    const itemExists = cartSummaryItems.filter((Item) => Item.id === item.id);
    if (itemExists.length > 0) {
      // item exists
      const restOfItems = cartSummaryItems.filter(
        (Item) => Item.id !== item.id
      );

      const UpdatedItem: CartSummaryItem = {
        ...itemExists[0],
        qty: itemExists[0].qty + 1,
      };

      setCartSummaryItems([...restOfItems, UpdatedItem]);
    } else {
      setCartSummaryItems((state) => [...state, item]);
    }
  }
  function ChangeQuantity(id: string, qty: number) {
    const itemExists = cartSummaryItems.filter((Item) => Item.id === id);
    if (itemExists.length > 0) {
      // item exists
      const restOfItems = cartSummaryItems.filter((Item) => Item.id !== id);

      const UpdatedItem: CartSummaryItem = {
        ...itemExists[0],
        qty: qty,
      };

      setCartSummaryItems([...restOfItems, UpdatedItem]);
    }
  }

  function RemoveItem(itemId: string) {
    setCartSummaryItems((state) => state.filter((item) => item.id !== itemId));
  }

  return {
    cartSummaryItems,
    AddNewItem,
    RemoveItem,
    ChangeQuantity,
  };
};
