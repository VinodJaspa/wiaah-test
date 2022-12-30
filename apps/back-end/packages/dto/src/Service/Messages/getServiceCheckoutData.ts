import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetServicesCheckoutDataMessage extends KafkaMessage<{
  services: {
    id: string;
    type: string;
    qty: number;
    discountId?: string;
  }[];
}> {}

export class GetServicesCheckoutDataMessageReply extends KafkaMessageReply<{
  services: {
    id: string;
    price: number;
    title: string;
    discounted?: number;
    sellerId: string;
    sellerStripeId: string;
  }[];
}> {}
