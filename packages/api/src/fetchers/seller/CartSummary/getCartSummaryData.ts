import { CartSummaryItemData } from "types";
import { CartSummaryProductsPH } from "ui";
export const getCartSummaryData = async (): Promise<CartSummaryItemData[]> => {
  console.log("APi");
  return CartSummaryProductsPH;
};
