import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetServicesCheckoutDataMessage extends KafkaMessage<{
  services: {
    id: string;
    type: string;
    qty: number;
  }[];
}> {}

export class GetServicesCheckoutDataMessageReply extends KafkaMessageReply<{
  services: {
    id: string;
    price: number;
    title: string;
    sellerId: string;
    sellerStripeId: string;
  }[];
}> {}
