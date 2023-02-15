import { KafkaMessage } from "../../Base";

export class OrderRefundRequestAcceptedEvent extends KafkaMessage<{
  sellerId: string;
  buyerId: string;
  amount: number;
  productId: string;
}> {}
