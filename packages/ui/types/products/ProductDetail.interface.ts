import { ProductTypes } from "types/market/Product";

export interface ProductDetails {
  id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  imgUrl: string;
  rating?: number;
  type: ProductTypes;
  off?: number;
  category?: string;
  saved?: boolean;
  available?: number;
  cashBack?: string;
  shippedToYourCountry?: boolean;
  discontUnits?: number;
  included?: string[];
}
