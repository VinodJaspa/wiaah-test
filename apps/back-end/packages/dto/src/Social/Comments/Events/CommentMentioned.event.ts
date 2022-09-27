import { KafkaMessage } from "../../../Base";

export class CommentMentionedEvent extends KafkaMessage<{
  commentId: string;
  mentionedProfileIds: string[];
  mentionedAt: string;
  mentionedByProfileId: string;
}> {}
