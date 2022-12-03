import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetProductMetaDataMessage extends KafkaMessage<{
  productId: string;
  userId: string;
}> {}

export class GetProductMetaDataMessageReply extends KafkaMessageReply<{
  thumbnail: string;
  shopId: string;
  price: number;
  name: string;
}> {}
