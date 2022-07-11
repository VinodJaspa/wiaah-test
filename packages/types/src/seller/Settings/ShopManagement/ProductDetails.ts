import { PriceType } from "types";

export interface ProductManagementDetailsDataType {
  id: string;
  image: string;
  name: string;
  price: PriceType;
  stockStatus: number;
  earnings: PriceType;
  sales: number;
  status: string;
}
