import { KafkaMessage } from "../../../Base";

export class CommentMentionedEvent extends KafkaMessage<{
  commentId: string;
  mentionedIds: {
    userId: string;
    profileId: string;
  }[];
  mentionedAt: string;
  mentionedByProfileId: string;
  mentionedByUserId: string;
}> {}
