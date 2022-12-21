import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { formatCaughtError, KAFKA_MESSAGES } from 'nest-utils';
import {
  KafkaPayload,
  GetCurrencyExchangeRateMessage,
  GetCurrencyExchangeRateMessageReply,
} from 'nest-dto';
import { CurrencyService } from './currency.service';

@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @MessagePattern(KAFKA_MESSAGES.CURRENCY_MESSAGES.getCurrencyExchangeRate)
  async getCurrencyExchange(
    @Payload() payload: KafkaPayload<GetCurrencyExchangeRateMessage>,
  ): Promise<GetCurrencyExchangeRateMessageReply> {
    try {
      const currency = await this.currencyService.getCurrencyDataByCode(
        payload.value.input.targetCurrencyCode,
      );

      return new GetCurrencyExchangeRateMessageReply({
        data: {
          rate: currency.exchangeRate,
          convertedFromCurrency: 'usd',
          convertedToCurrency: payload.value.input.targetCurrencyCode,
        },
        error: null,
        success: true,
      });
    } catch (error) {
      return new GetCurrencyExchangeRateMessageReply({
        data: null,
        error: error,
        success: false,
      });
    }
  }
}
