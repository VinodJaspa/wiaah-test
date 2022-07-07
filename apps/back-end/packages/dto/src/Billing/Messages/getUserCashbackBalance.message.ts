import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserCashbackBalanceMessage extends KafkaMessage<{
  userId: string;
}> {}

export class GetUserCashbackBalanceMessageReply extends KafkaMessageReply<{
  cashbackBalance: number;
}> {}
