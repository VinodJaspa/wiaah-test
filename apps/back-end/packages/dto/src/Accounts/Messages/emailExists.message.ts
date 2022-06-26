import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class EmailExistsMessage extends KafkaMessage<{ email: string }> {}

export class EmailExistsMessageReply extends KafkaMessageReply<{
  emailExists: boolean;
}> {}
