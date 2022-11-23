import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetItemSellerIdMessage extends KafkaMessage<{
  type: string;
  id: string;
}> {}

export class GetItemSellerIdMessageReply extends KafkaMessageReply<string> {}
