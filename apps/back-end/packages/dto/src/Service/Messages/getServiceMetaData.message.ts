import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetServiceMetaDataMessage extends KafkaMessage<{
  serviceId: string;
  userId: string;
}> {}
export class GetServiceMetaDataMessageReply extends KafkaMessageReply<{
  name: string;
  price: number;
  thumbnail: string;
  providerId: string;
}> {}
