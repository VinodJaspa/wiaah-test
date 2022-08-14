import { WishlistItem } from "types";
import { products } from "ui";
export const getWishlistItemsData = async (): Promise<WishlistItem[]> => {
  return products;
};
