import { OrderedProductStatus } from "types";

export interface UpdateProductStatusDto {
  productId: string;
  status: OrderedProductStatus;
}
