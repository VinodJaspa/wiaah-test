export interface CartSummaryItemData {
  shop: ShopContactDetails;
  item: CartSummaryItem;
}

export interface ShopContactDetails {
  name: string;
  id: string;
  imageUrl: string;
}

export interface CartSummaryItem {
  id: string;
  name: string;
  imageUrl: string;
  qty: number;
  shippingMotheds?: ShippingMothed[];
  price: number;
  type: "service" | "product";
  location?: string;
  date?: number;
  eventDuration?: number;
  eventAdresses?: string;
  size?: string;
  color?: string;
  discount?: {
    value: number;
    unit: DiscountUnit;
  };
  oldPrice?: number;
  cashback?: {
    value: number;
    unit: DiscountUnit;
  };
  description?: string;
}

export type DiscountUnit = "%" | "$";
// export interface ProductSize {
//   size: "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
// }

export interface ShippingMothed {
  name: "Click & Collect" | "European union" | "International";
  value: "click_and_collect" | "european_union" | "international";
  deliveryTime: {
    from: number;
    to: number;
  };
}
