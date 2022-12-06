import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShippingMethodMessage extends KafkaMessage<{
  id: string;
}> {}

export class GetShippingMethodMessageReply extends KafkaMessageReply<{
  ownerId: string;
  cost: number;
  name: string;
  countries: string[];
}> {}
