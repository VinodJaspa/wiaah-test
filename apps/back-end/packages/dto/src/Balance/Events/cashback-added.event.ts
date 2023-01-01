import { KafkaMessage } from "../../Base";

export class CashbackAddedEvent extends KafkaMessage<{
  userId: string;
  amount: number;
}> {}
