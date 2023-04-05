import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetProductsMetaDataMessage extends KafkaMessage<{
  productsIds: string[];
}> {}

export class GetProductsMetaDataMessageReply extends KafkaMessageReply<
  {
    productId: string;
    ownerId: string;
    title: string;
    tax: number;
    price: number;
    thumbnail: string;
    category: string[];
  }[]
> {}
