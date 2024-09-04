import { atom, selector } from "recoil";
import { ShoppingCartItem } from "types";

export const ShoppingCartItemsState = atom<ShoppingCartItem[]>({
  key: `ShoppingCartItemsState_${Date.now()}`,
  default: [],
});

export const ShoppingCartToggleState = atom<boolean>({
  key: `ShoppingCartToggleState_${Date.now()}`,
  default: false,
});

export const ShoppingCartTotalItemsLengthState = selector<number>({
  key: `ShoppingCartTotalItemsLength_${Date.now()}`,
  get: ({ get }) => {
    const cartItems = get(ShoppingCartItemsState);
    return cartItems.length;
  },
});

export const ShoppingCartTotalItemsCost = selector<number>({
  key: `ShoppingCartTotalItemsCost_${Date.now()}`,
  get: ({ get }) => {
    const items = get(ShoppingCartItemsState);
    const total = items.reduce((acc, item) => {
      const totalItemPrice = item.price * item.quantity;
      return acc + totalItemPrice;
    }, 0);
    return total;
  },
});
