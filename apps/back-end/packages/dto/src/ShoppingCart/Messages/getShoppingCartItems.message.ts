import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShoppingCartItemsMessage extends KafkaMessage<{
  ownerId: string;
}> {}

export class GetShoppingCartItemsMessageReply extends KafkaMessageReply<
  {
    id: string;
    shopId: string;
    name: string;
    price: number;
  }[]
> {}
