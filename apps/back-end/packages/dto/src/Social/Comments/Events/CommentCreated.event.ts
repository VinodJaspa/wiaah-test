import { KafkaMessage } from "../../../Base";

export class CommentCreatedEvent extends KafkaMessage<{
  commentId: string;
  commentedByProfileId: string;
  commentedAt: string;
}> {}
