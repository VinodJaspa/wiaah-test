import { KafkaMessage } from "../../../Base";

export type CommentHostType = "comment" | "post";

export class CommentCreatedEvent extends KafkaMessage<{
  hostType: CommentHostType;
  hostId: string;
  mainHostId: string;
  commentId: string;
  commentedByUserId: string;
  commentedByProfileId: string;
  commentedAt: string;
  contentOwnerUserId: string;
}> {}
