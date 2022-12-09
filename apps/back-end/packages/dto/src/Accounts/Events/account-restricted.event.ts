import { KafkaMessage } from "../../Base";

export class AccountRestrictedEvent extends KafkaMessage<{
  id: string;
  reason: string;
}> {}
