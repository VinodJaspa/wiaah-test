import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetCurrencyExchangeRateMessage extends KafkaMessage<{
  targetCurrencyCode: string;
}> {}

export class GetCurrencyExchangeRateMessageReply extends KafkaMessageReply<{
  rate: number;
  convertedToCurrency: string;
  convertedToSymbol: string;
  convertedFromCurrency: string;
}> {}
