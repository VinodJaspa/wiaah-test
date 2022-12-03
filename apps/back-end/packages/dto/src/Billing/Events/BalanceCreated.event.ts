import { KafkaMessage } from "../../Base";

export class BalanceCreatedEvent extends KafkaMessage<{
  id: string;
  ownerId: string;
}> {}
