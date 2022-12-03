import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetProductsCheckoutDataMessage extends KafkaMessage<{
  products: { id: string; qty: number }[];
}> {}

export class GetProductsCheckoutDataMessageReply extends KafkaMessageReply<{
  products: {
    id: string;
    price: number;
    qty: number;
    title: string;
    sellerId: string;
    sellerStripeId: string;
  }[];
}> {}
