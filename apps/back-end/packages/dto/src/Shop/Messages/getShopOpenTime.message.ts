import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShopOpenTimeMessage extends KafkaMessage<{
  ids: string[];
}> {}

export class GetShopOpenTimeMessageReply extends KafkaMessageReply<{
  shops: {
    id: string;
    openTime: {
      from: Date;
      to: Date;
    };
    location: {
      city: string;
    };
    thumbnail: string;
    sellerId: string;
  }[];
}> {}
