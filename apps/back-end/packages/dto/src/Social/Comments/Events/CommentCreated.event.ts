import { KafkaMessage } from "../../../Base";

export type CommentHostType = "comment" | "post";

export class CommentCreatedEvent extends KafkaMessage<{
  hostType: CommentHostType;
  hostId: string;
  hostAuthorId: string;
  mainHostId: string;
  mainHostAuthorId: string;
  contentOwnerUserId: string;
  commentId: string;
  commentedByUserId: string;
  commentedByProfileId: string;
  commentedAt: string;
}> {}
