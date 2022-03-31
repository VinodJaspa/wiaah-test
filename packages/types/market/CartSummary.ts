import { WishlistItem } from "./Wishlist.interface";
export interface CartSummaryItemData {
  shop: {
    name: string;
    id: string;
    imageUrl: string;
  };
  item: CartSummaryItem;
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
    unit: "%" | "$";
  };
  oldPrice?: number;
  cashback?: {
    value: number;
    unit: "%" | "$";
  };
  description?: string;
}

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
