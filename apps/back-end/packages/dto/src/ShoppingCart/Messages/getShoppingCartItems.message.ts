import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShoppingCartItemsMessage extends KafkaMessage<{
  ownerId: string;
}> {}

export class GetShoppingCartItemsMessageReply extends KafkaMessageReply<{
  items: {
    id: string;
    shopId: string;
    name: string;
    price: number;
  }[];
  voucher: {
    code: string;
    amount: number;
    currency: string;
    convertedAmount: number;
  };
}> {}
