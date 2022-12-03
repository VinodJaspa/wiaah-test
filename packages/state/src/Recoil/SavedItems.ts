import { atom } from "recoil";
import { WishlistItem } from "types";
export const SavedItemsState = atom<WishlistItem[]>({
  key: "SavedItemsState",
  default: [],
});
