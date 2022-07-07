import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class ApplyableVoucherMessage extends KafkaMessage<{
  userId: string;
  voucherCode: string;
}> {}

export class ApplyableVoucherMessageReply extends KafkaMessageReply<{
  applyable: boolean;
  code: string;
  amount: number;
  currency: string;
  convertedAmount: number;
  convertedToCurrency: string;
}> {}
