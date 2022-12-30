import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetProductsCheckoutDataMessage extends KafkaMessage<{
  products: { id: string; qty: number; discountId?: string }[];
}> {}

export class GetProductsCheckoutDataMessageReply extends KafkaMessageReply<{
  products: {
    id: string;
    price: number;
    qty: number;
    discounted?: number;
    title: string;
    sellerId: string;
    sellerStripeId: string;
  }[];
}> {}
