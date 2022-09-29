import { KafkaMessage } from "../../../Base";

export type CommentHostType = "comment" | "post";

export class CommentCreatedEvent extends KafkaMessage<{
  hostType: CommentHostType;
  commentId: string;
  commentedByUserId: string;
  commentedByProfileId: string;
  commentedAt: string;
}> {}
