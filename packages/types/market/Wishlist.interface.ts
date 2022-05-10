export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  type?: "product" | "service";
  currency?: string;
  currencySymbol?: string;
  colors?: string[];
  liked?: boolean;
  cashback?: string;
  discount?: number;
  oldPrice?: number;
  rating?: number;
}
