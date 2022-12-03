import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class IsProductAddableMessage extends KafkaMessage<{
  productId: string;
}> {}

export class IsProductAddableMessageReply extends KafkaMessageReply<{
  isAddable: boolean;
}> {}
