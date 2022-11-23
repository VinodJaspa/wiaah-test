import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetProductSellerIdMessage extends KafkaMessage<{
  productId: string;
}> {}

export class GetProductSellerIdMessageReply extends KafkaMessageReply<{
  sellerId: string;
}> {}
