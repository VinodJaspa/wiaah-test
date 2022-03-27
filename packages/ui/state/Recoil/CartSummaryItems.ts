import { atom, selector } from "recoil";
import { CartSummaryItem } from "types/market/CartSummary";

export const CartSummaryItemsState = atom<CartSummaryItem[]>({
  key: "CartSummaryItems",
  default: [],
});

export const CartSummaryTotalPriceState = selector<number>({
  key: "CartSummaryTotalPriceState",
  get: ({ get }) => {
    const currentItems = get(CartSummaryItemsState);
    const total = currentItems.reduce((prev, current) => {
      const totalItemPrice = current.price * current.qty;
      return prev + totalItemPrice;
    }, 0);
    return total;
  },
});
