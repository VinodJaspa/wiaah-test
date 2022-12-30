import { KafkaMessage } from "../../Base";

export class OrderCanceledEvent extends KafkaMessage<{
  products: {
    id: string;
    qty: number;
  }[];
  shippingMethodId: string;
  discountId: string;
  status: string;
  sellerId: string;
  buyerId: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  discounted: number;
}> {}
