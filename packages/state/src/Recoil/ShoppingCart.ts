import { atom, selector } from "recoil";
import { ShoppingCartItem } from "types";

export const ShoppingCartItemsState = atom<ShoppingCartItem[]>({
  key: "ShoppingCartItemsState",
  default: [],
});

export const ShoppingCartToggleState = atom<boolean>({
  key: "ShoppingCartToggleState",
  default: false,
});

export const ShoppingCartTotalItemsLengthState = selector<number>({
  key: "ShoppingCartTotalItemsLength",
  get: ({ get }) => {
    const cartItems = get(ShoppingCartItemsState);
    return cartItems.length;
  },
});

export const ShoppingCartTotalItemsCost = selector<number>({
  key: "ShoppingCartTotalItemsCost",
  get: ({ get }) => {
    const items = get(ShoppingCartItemsState);
    const total = items.reduce((acc, item) => {
      const totalItemPrice = item.price * item.quantity;
      return acc + totalItemPrice;
    }, 0);
    return total;
  },
});
