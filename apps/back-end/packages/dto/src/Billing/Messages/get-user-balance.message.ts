import { KafkaMessage } from "../../Base";

export class GetUserBalanceMessage extends KafkaMessage<{
  userId: string;
}> {}

export class GetUserBalanceMessageReply extends KafkaMessage<{
  withdrawable: number;
  cashback: number;
  pending: number;
}> {}
