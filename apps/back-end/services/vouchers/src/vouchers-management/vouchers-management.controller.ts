import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  formatCaughtError,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { VouchersManagementService } from './vouchers-management.service';
import {
  ApplyableVoucherMessage,
  ApplyableVoucherMessageReply,
  GetShopVouchersMessage,
  GetShopVouchersMessageReply,
  KafkaPayload,
} from 'nest-dto';

@Controller()
export class VouchersManagementController implements OnModuleInit {
  constructor(
    private readonly vouchersService: VouchersManagementService,
    @Inject(SERVICES.VOUCHERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @MessagePattern(KAFKA_MESSAGES.VOUCHERS_MESSAGES.getShopActiveVouchers)
  async getShopVouchers(
    @Payload() payload: KafkaPayload<GetShopVouchersMessage>,
  ): Promise<GetShopVouchersMessageReply> {
    try {
      const {
        value: {
          input: { shopId },
        },
      } = payload;
      const vouchers = await this.vouchersService.getVouchersByOwnerId(shopId, {
        status: 'active',
      });

      return new GetShopVouchersMessageReply({
        success: true,
        error: null,
        data: vouchers.map(({ amount, code, status, currency }) => ({
          amount,
          code,
          currency,
        })),
      });
    } catch (error) {
      return new GetShopVouchersMessageReply({
        success: false,
        data: null,
        error: new Error(
          error instanceof Error ? error.message : 'Unknown error',
        ),
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.VOUCHERS_MESSAGES.isApplyableVoucher)
  async handleIsApplyableVoucherMsg(
    @Payload() payload: KafkaPayload<ApplyableVoucherMessage>,
  ): Promise<ApplyableVoucherMessageReply> {
    try {
      const {
        value: {
          input: { userId, voucherCode },
        },
      } = payload;

      const [
        applyable,
        {
          amount,
          code,
          convertedAmount,
          currency,
          status,
          convertedToCurrency,
        },
      ] = await this.vouchersService.isVoucherApplyable(userId, voucherCode);

      return new ApplyableVoucherMessageReply({
        success: true,
        error: null,
        data: {
          voucherId: '',
          applyable,
          amount,
          code,
          convertedAmount,
          currency,
          convertedToCurrency,
        },
      });
    } catch (err) {
      return new ApplyableVoucherMessageReply({
        success: false,
        error: new Error(err instanceof Error ? err.message : 'Unknown error'),
        data: null,
      });
    }
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.CURRENCY_MESSAGES.getCurrencyExchangeRate,
    );
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserCashbackBalance,
    );
    await this.eventsClient.connect();
  }
}
