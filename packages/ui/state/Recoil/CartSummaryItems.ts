import { atom } from "recoil";
import { CartSummaryItem } from "types/market/CartSummary";

export const CartSummaryItems = atom<CartSummaryItem[]>({
  key: "CartSummaryItems",
  default: [],
});
