import { KafkaMessage } from "../../Base";

export class ChatMessageSentEvent extends KafkaMessage<{
  messageId: string;
  userId: string;
}> {}
