import { CartSummaryItem, DiscountUnit } from "./CartSummary";

export interface VoucherType {
  voucherName: string;
  value: number;
  unit: DiscountUnit;
}

export interface CheckoutCart {
  voucher?: VoucherType;
  products: CartSummaryItem[];
}

export interface ShippingMothed {
  cost: number;
  name: string;
  description?: string;
  id: string;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
