import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class IsOwnerOfShopMessage extends KafkaMessage<{
  ownerId: string;
  shopId: string;
}> {}

export class IsOwnerOfShopMessageReply extends KafkaMessageReply<boolean> {}
