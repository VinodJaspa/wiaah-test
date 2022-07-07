import { KafkaMessage } from "../../Base";

export class VoucherAppliedEvent extends KafkaMessage<{
  code: string;
  currency: string;
  amount: number;
  convertedAmount: number;
  userId: string;
}> {}
