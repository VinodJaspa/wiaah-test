import { atom } from "recoil";
import { WishlistItem } from "types/market/Wishlist.interface";
export const SavedItemsState = atom<WishlistItem[]>({
  key: "SavedItemsState",
  default: [],
});
