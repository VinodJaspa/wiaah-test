import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetUserCashbackBalanceMessage,
  GetUserCashbackBalanceMessageReply,
  KafkaPayload,
  OrderItemBillingReadyEvent,
  OrderRefundRequestRejectedEvent,
  SellerProductsPurchasedEvent,
  VoucherAppliedEvent,
} from 'nest-dto';
import { formatCaughtError, KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { BalanceService } from './balance.service';

@Controller()
export class BalanceController {
  constructor(
    private readonly balacneService: BalanceService,
    private readonly prisma: PrismaService,
  ) {}

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
        error: new Error(formatCaughtError(err)),
      });
    }
  }

  @EventPattern(KAFKA_EVENTS.VOUCHER_EVENTS.voucherApplied)
  async handleVoucherCreatedEvent(
    @Payload() payload: KafkaPayload<VoucherAppliedEvent>,
  ) {
    try {
      const { userId, convertedAmount } = payload.value.input;
      const data = await this.balacneService.removeCashbackBalance(
        userId,
        convertedAmount,
      );
    } catch (err) {
      console.log(err);
    }
  }

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased('*', true))
  async handleProductPurchasedEvent(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    const affiliations = value.input.products.map(({ affiliation, id }) => ({
      userId: affiliation.affiliatorId,
      amount: affiliation.affiliationAmount,
      productId: id,
    }));

    const res = affiliations.map((v) =>
      this.balacneService.addPendingBalance(v.userId, v.amount),
    );

    await Promise.all(res);
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderItemBillingReady())
  async handleOrderBillingReady(
    @Payload() { value }: { value: OrderItemBillingReadyEvent },
  ) {
    if (value.input.cashback) {
      await this.balacneService.addCashbackBalance(
        value.input.buyerId,
        value.input.cashback,
      );
    }

    if (value.input.affiliationAmount && value.input.affiliatorId) {
      await this.balacneService.addWithdrawableBalance(
        value.input.affiliatorId,
        value.input.affiliationAmount,
      );
    }

    await this.balacneService.addWithdrawableBalance(
      value.input.sellerId,
      value.input.paidPrice -
        (value.input.affiliationAmount || 0) -
        (value.input.cashback || 0),
    );
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderRefundRequestAccepted())
  async handleProductRefunded(
    @Payload() { value }: { value: OrderRefundRequestRejectedEvent },
  ) {
    try {
      const res = await this.prisma.$transaction([
        this.prisma.balance.update({
          where: {
            ownerId: value.input.sellerId,
          },
          data: {
            pendingBalance: {
              decrement: value.input.amount,
            },
          },
        }),
        this.prisma.balance.update({
          where: {
            ownerId: value.input.buyerId,
          },
          data: {
            cashbackBalance: value.input.amount,
          },
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
