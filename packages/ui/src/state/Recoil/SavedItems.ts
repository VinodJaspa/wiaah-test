import { atom } from "recoil";
import { CartSummaryItem } from "types";
export const SavedItemsState = atom<CartSummaryItem[]>({
  key: "SavedItemsState",
  default: [],
});
