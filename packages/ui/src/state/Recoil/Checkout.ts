import { atom, selector } from "recoil";
import { CartSummaryItem, VoucherType } from "types";

export const VoucherState = atom<VoucherType | undefined>({
  key: `VoucherState_${Date.now()}`,
  default: undefined,
});

export const CheckoutProductsState = atom<CartSummaryItem[]>({
  key: `CheckoutProductsState_${Date.now()}`,
  default: [],
});

export const CheckoutProductsTotalPriceState = selector<number>({
  key: `checkoutProductsTotalPriceState_${Date.now()}`,
  get: ({ get }) => {
    const voucher = get(VoucherState);
    const currentItems = get(CheckoutProductsState);

    const total = currentItems.reduce((prev, current) => {
      const totalItemPrice = current.price * current.qty;
      return prev + totalItemPrice;
    }, 0);

    if (voucher) {
      let totalPrice;
      if (voucher.unit === "%") {
        totalPrice = (voucher.value / 100) * total;
      } else if (voucher.unit === "$") {
        totalPrice = total - voucher.value;
      } else {
        totalPrice = total;
      }
      return Math.round(totalPrice);
    } else {
      return total;
    }
  },
});
