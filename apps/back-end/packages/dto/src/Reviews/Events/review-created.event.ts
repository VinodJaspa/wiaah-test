import { KafkaMessage } from "../../Base";

export class ReviewCreatedEvemt extends KafkaMessage<{
  reviewId: string;
  reviewerId: string;
  contentAuthorId: string;
}> {}
