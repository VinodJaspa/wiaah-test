import { value atom, value selector } from "recoil";
import { value ShoppingCartItem } from "../../types/shoppingCart/shoopingCartItem.interface";

export const ShoppingCartItemsState = atom<{ items: ShoppingCartItem[] }>({
  key: "ShoppingCartItemsState",
  default: {
    items: [
      {
        id: "1",
        name: "item 1",
        price: 5,
        quantity: 3,
        thumbnail: "/shop",
      },
    ],
  },
});

export const ShoppingCartToggleState = atom<boolean>({
  key: "ShoppingCartToggleState",
  default: false,
});

export const ShoppingCartTotalItemsLengthState = selector<number>({
  key: "ShoppingCartTotalItemsLength",
  get: ({ get }) => {
    const cartItems = get(ShoppingCartItemsState);
    return cartItems.items.length;
  },
});

export const ShoppingCartTotalItemsCost = selector<number>({
  key: "ShoppingCartTotalItemsCost",
  get: ({ get }) => {
    const items = get(ShoppingCartItemsState).items;
    const total = items.reduce((acc, item) => {
      const totalItemPrice = item.price * item.quantity;
      return acc + totalItemPrice;
    }, 0);
    return total;
  },
});
