import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetVoucherDataMessage extends KafkaMessage<{
  voucherCode: string;
  userId: string;
}> {}

export class GetVoucherDataMessageReply extends KafkaMessageReply<{
  code: string;
  amount: number;
  currency: string;
}> {}
