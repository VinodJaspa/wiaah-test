import { KafkaMessage } from "../../Base";

export class AccountSuspendedEvent extends KafkaMessage<{
  id: string;
  reason: string;
}> {}
