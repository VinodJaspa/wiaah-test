import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class UserHasStripeAccountMessage extends KafkaMessage<{
  userId: string;
}> {}

export class UserHasStripeAccountMessageReply extends KafkaMessageReply<{
  hasAccount: boolean;
}> {}
