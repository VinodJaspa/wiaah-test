import { KafkaMessage } from "../../Base";

export class WithdrawalProcessedEvent extends KafkaMessage<{
  amount: number;
  userId: string;
}> {}
