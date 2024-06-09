import { atom } from "recoil";
import { CartSummaryItem, ProductDetails } from "types";

export const SavedItemsState = atom<CartSummaryItem[]>({
  key: "SavedItemsState",
  default: [],
});

export const SavedProductDetailedItemState = atom<ProductDetails[]>({
  key: "SavedProductDetailedItem",
  default: [],
});
