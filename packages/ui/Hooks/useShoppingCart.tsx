import React from "react";
import { useRecoilState } from "recoil";
import { ShoppingCartItemsState, ShoppingCartToggleState } from "../state";
import { ShoppingCartItem } from "../types/shoppingCart/shoppingCartItem.interface";

interface useAddItemToCartProps {}

export const useShoppingCart = () => {
  const [ShoppingCartItems, setShoppingCartItems] = useRecoilState(
    ShoppingCartItemsState
  );
  const [ShoppingCartOpen, setShoppingCartOpen] = useRecoilState(
    ShoppingCartToggleState
  );

  function AddNewItem(item: ShoppingCartItem) {
    // TO DO, incress qty instead of add new item
    const itemExists = ShoppingCartItems.filter((Item) => Item.id === item.id);
    if (itemExists.length > 0) {
      // item exists
      const restOfItems = ShoppingCartItems.filter(
        (Item) => Item.id !== item.id
      );

      const UpdatedItem: ShoppingCartItem = {
        ...itemExists[0],
        quantity: itemExists[0].quantity + 1,
      };

      setShoppingCartItems([...restOfItems, UpdatedItem]);
    } else {
      setShoppingCartItems((state) => [...state, item]);
    }
  }

  function RemoveItem(itemId: string) {
    setShoppingCartItems((state) => state.filter((item) => item.id !== itemId));
  }

  function OpenShoppingCart() {
    setShoppingCartOpen(true);
  }

  function closeShoppingCart() {
    setShoppingCartOpen(false);
  }

  return {
    ShoppingCartItems,
    AddNewItem,
    RemoveItem,
    ShoppingCartOpen,
    OpenShoppingCart,
    closeShoppingCart,
  };
};
