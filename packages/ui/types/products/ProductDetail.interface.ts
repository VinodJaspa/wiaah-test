export interface ProductDetails {
  id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  imgUrl: string;
  rating?: number;
  off?: number;
  category?: string;
  saved?: boolean;
  available?: number;
  cashBack?: string;
  shippedToYourCountry?: boolean;
  discontUnits?: number;
  included?: string[];
}
