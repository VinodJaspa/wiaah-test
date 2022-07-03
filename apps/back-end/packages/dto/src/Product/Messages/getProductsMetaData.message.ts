import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetProductsMetaDataMessage extends KafkaMessage<{
  productsIds: string[];
}> {}

export class GetProductsMetaDataMessageReply extends KafkaMessageReply<
  {
    productId: string;
    shopId: string;
    ownerId: string;
  }[]
> {}
