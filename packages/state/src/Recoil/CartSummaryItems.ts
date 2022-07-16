import { atom, selector } from "recoil";
import { CartSummaryItemData } from "types";
import { VoucherState } from "./Checkout";

export const CartSummaryItemsState = atom<CartSummaryItemData[]>({
  key: "CartSummaryItemsData",
  default: [],
});

export const CartSummaryTotalPriceState = selector<number>({
  key: "CartSummaryTotalPriceState",
  get: ({ get }) => {
    const voucher = get(VoucherState);
    const currentItems = get(CartSummaryItemsState);

    const total = currentItems.reduce((prev, current) => {
      const totalItemPrice = current.item.price * current.item.qty;
      return prev + totalItemPrice;
    }, 0);

    if (voucher) {
      let totalPrice;
      if (voucher.unit === "%") {
        totalPrice = total - voucher.value / total;
        console.log("total Price", totalPrice);
      } else if (voucher.unit === "$") {
        totalPrice = total - voucher.value;
      } else {
        totalPrice = total;
      }
      return totalPrice;
    } else {
      return total;
    }
  },
});
export const CartSummaryOnlyProdcutsState = selector<CartSummaryItemData[]>({
  key: "CartSummaryOnlyProdcutsState",
  get: ({ get }) => {
    const currentItems = get(CartSummaryItemsState);

    return currentItems.filter((item) => item.item.type === "product");
  },
});
export const CartSummaryOnlyServicesState = selector<CartSummaryItemData[]>({
  key: "CartSummaryOnlyServicesState",
  get: ({ get }) => {
    const currentItems = get(CartSummaryItemsState);

    return currentItems.filter((item) => item.item.type === "service");
  },
});
