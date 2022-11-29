import { KafkaMessage } from "../../../Base";

export class UserMentionEvent extends KafkaMessage<{
  userId: string;
  mentionedId: string;
  hostId: string;
  hostType: string;
}> {}
