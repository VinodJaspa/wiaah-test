import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShoppingCartItemsMessage extends KafkaMessage<{
  ownerId: string;
}> {}

export class GetShoppingCartItemsMessageReply extends KafkaMessageReply<
  {
    Id: string;
    shopId: string;
    Name: string;
    Price: number;
  }[]
> {}
