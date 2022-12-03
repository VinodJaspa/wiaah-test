import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShoppingCartItemsMessage extends KafkaMessage<{
  ownerId: string;
}> {}

export class GetShoppingCartItemsMessageReply extends KafkaMessageReply<{
  items: {
    id: string;
    type: string;
    qty: number;
  }[];
  voucherId?: String;
}> {}
