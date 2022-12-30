import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetCurrencyExchangeQuery,
  GetCurrencyExchangeQueryRes,
} from '@manager/queries/impl';
import { Inject } from '@nestjs/common';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetCurrencyExchangeRateMessage,
  GetCurrencyExchangeRateMessageReply,
} from 'nest-dto';

@QueryHandler(GetCurrencyExchangeQuery)
export class GetCurrencyExchangeQueryHandler
  implements IQueryHandler<GetCurrencyExchangeQuery>
{
  constructor(
    @Inject(SERVICES.NOTIFICATIONS.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    amount,
    currency,
  }: GetCurrencyExchangeQuery): Promise<GetCurrencyExchangeQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetCurrencyExchangeRateMessage,
      GetCurrencyExchangeRateMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.CURRENCY_MESSAGES.getCurrencyExchangeRate,
      new GetCurrencyExchangeRateMessage({
        targetCurrencyCode: currency,
      }),
    );

    if (!success) {
      return {
        amount,
        currency,
        symbol: '$',
      };
    }

    return {
      amount: amount * data.rate,
      currency: data.convertedToCurrency,
      symbol: data.convertedToSymbol,
    };
  }
}
