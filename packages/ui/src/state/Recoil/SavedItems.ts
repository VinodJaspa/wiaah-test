import { atom } from "recoil";
import { CartSummaryItem, ProductDetails } from "types";

export const SavedItemsState = atom<CartSummaryItem[]>({
  key: `SavedItemsState_${Date.now()}`,
  default: [],
});

export const SavedProductDetailedItemState = atom<ProductDetails[]>({
  key: `SavedProductDetailedItem_${Date.now()}`,
  default: [],
});
