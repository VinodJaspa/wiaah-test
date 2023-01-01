import { KafkaMessage } from "../../Base";

export class OrderRefundRequestRejectedEvent extends KafkaMessage<{
  sellerId: string;
  buyerId: string;
  amount: number;
  reason: string;
  productId: string;
}> {}
