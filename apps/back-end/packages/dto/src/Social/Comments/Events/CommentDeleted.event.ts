import { KafkaMessage } from "../../../Base";

export class CommentDeletedEvent extends KafkaMessage<{
  commentId: string;
  contentId: string;
  contentType: string;
}> {}
