import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class CanPreformProductActionMessage extends KafkaMessage<{
  product: {
    id: string;
  };
  seller: {
    id: string;
    membershipId: string;
  };
  action: string;
}> {}

export class CanPreformProductActionMessageReply extends KafkaMessageReply<boolean> {}
