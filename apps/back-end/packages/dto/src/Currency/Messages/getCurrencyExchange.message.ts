import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetCurrencyExchangeRateMessage extends KafkaMessage<{
  baseCurrencyCode: string;
  targetCurrencyCode: string;
}> {}

export class GetCurrencyExchangeRateMessageReply extends KafkaMessageReply<{
  rate: number;
}> {}
