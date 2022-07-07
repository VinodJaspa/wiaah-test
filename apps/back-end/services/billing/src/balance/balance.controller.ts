import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetUserCashbackBalanceMessage,
  GetUserCashbackBalanceMessageReply,
  KafkaPayload,
  VoucherAppliedEvent,
} from 'nest-dto';
import { formatCaughtError, KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import { BalanceService } from './balance.service';

@Controller()
export class BalanceController {
  constructor(private readonly balacneService: BalanceService) {}

  @MessagePattern(KAFKA_MESSAGES.BILLING_MESSAGES.getUserCashbackBalance)
  async getUserCashbackBalance(
    @Payload() payload: KafkaPayload<GetUserCashbackBalanceMessage>,
  ): Promise<GetUserCashbackBalanceMessageReply> {
    try {
      const { cashbackBalance } = await this.balacneService.getUserBalance(
        payload.value.input.userId,
      );

      return new GetUserCashbackBalanceMessageReply({
        error: null,
        success: true,
        data: {
          cashbackBalance,
        },
      });
    } catch (err) {
      return new GetUserCashbackBalanceMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(err),
      });
    }
  }

  @EventPattern(KAFKA_EVENTS.VOUCHER_EVENTS.voucherApplied)
  async handleVoucherCreatedEvent(
    @Payload() payload: KafkaPayload<VoucherAppliedEvent>,
  ) {
    try {
      console.log('applied voucher');
      const { userId, convertedAmount } = payload.value.input;
      const data = await this.balacneService.removeCashbackBalance(
        userId,
        convertedAmount,
      );
    } catch (err) {
      console.log(err);
    }
  }
}
