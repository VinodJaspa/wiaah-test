import { atom, selector } from "recoil";
import { CartSummaryItemData } from "types/market/CartSummary";

export const CartSummaryItemsState = atom<CartSummaryItemData[]>({
  key: "CartSummaryItemsData",
  default: [],
});

export const CartSummaryTotalPriceState = selector<number>({
  key: "CartSummaryTotalPriceState",
  get: ({ get }) => {
    const currentItems = get(CartSummaryItemsState);
    const total = currentItems.reduce((prev, current) => {
      const totalItemPrice = current.item.price * current.item.qty;
      return prev + totalItemPrice;
    }, 0);
    return total;
  },
});
