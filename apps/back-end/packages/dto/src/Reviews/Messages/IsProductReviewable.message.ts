import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class IsProductReviewableMessage extends KafkaMessage<{
  productId: string;
  reviewerId: string;
}> {}

export class IsProductReviewableMessageReply extends KafkaMessageReply<boolean> {}
