import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetServicesOpenTimeDataMessage extends KafkaMessage<{
  services: {
    id: string;
    type: string;
  }[];
}> {}

export class GetServicesOpenTimeDataMessageReply extends KafkaMessageReply<{
  services: {
    id: string;
    type: string;
    sellerId: string;
    openTime: {
      from: Date;
      to: Date;
    };
    thumbnail: string;
    location: {
      city: string;
    };
  }[];
}> {}
