import { KafkaMessage } from "../../Base";

export class ChatMessageSentEvent extends KafkaMessage<{
  messageId: string;
  userId: string;
}> {}

export class ChatPrivateMessageSentEvent extends KafkaMessage<{
  sentToId: string;
  sentById: string;
  messageId: string;
}> {}
