import { Balance } from '@entities';
import { BalanceNotFoundException } from '@exception';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import {
  BalanceCreatedEvent,
  GetCurrencyExchangeRateMessage,
  GetCurrencyExchangeRateMessageReply,
  GetVoucherDataMessage,
  GetVoucherDataMessageReply,
} from 'nest-dto';

@Injectable()
export class BalanceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async clear() {
    return this.prisma.balance.deleteMany();
  }

  async addCashbackBalance(userId: string): Promise<Balance> {
    return this.prisma.balance.update({
      where: {
        ownerId: userId,
      },
      data: {
        cashbackBalance: 50,
      },
    });
  }

  async getUserBalance(ownerId: string): Promise<Balance> {
    const balance = await this.prisma.balance.findUnique({
      where: {
        ownerId,
      },
    });

    if (!balance) return this.createBalance(ownerId);

    return balance;
  }

  async createBalance(ownerId: string): Promise<Balance> {
    const createdBalance = await this.prisma.balance.create({
      data: {
        ownerId,
        pendingBalance: 0,
        withdrawableBalance: 0,
        cashbackBalance: 0,
      },
    });

    this.eventsClient.emit<any, BalanceCreatedEvent>(
      KAFKA_EVENTS.BILLING_EVNETS.balanceCreated,
      new BalanceCreatedEvent({
        id: createdBalance.id,
        ownerId: createdBalance.ownerId,
      }),
    );

    return createdBalance;
  }

  async addPendingBalance(ownerId: string, amount: number): Promise<Balance> {
    try {
      const balance = await this.prisma.balance.update({
        where: {
          ownerId,
        },
        data: {
          pendingBalance: {
            increment: amount,
          },
        },
      });
      return balance;
    } catch {
      throw new BalanceNotFoundException('owner id');
    }
  }

  async removePendingBalance(ownerId: string, amount: number) {
    try {
      const balance = await this.prisma.balance.update({
        where: {
          ownerId,
        },
        data: {
          pendingBalance: {
            decrement: amount,
          },
        },
      });

      return balance;
    } catch {
      throw new BalanceNotFoundException('owner id');
    }
  }

  async addWithdrawableBalance(
    ownerId: string,
    amount: number,
  ): Promise<Balance> {
    try {
      const balance = await this.prisma.balance.update({
        where: {
          ownerId,
        },
        data: {
          withdrawableBalance: {
            increment: amount,
          },
        },
      });

      return balance;
    } catch {
      throw new BalanceNotFoundException('owner id');
    }
  }

  async removeWithdrawableBalance(
    ownerId: string,
    amount: number,
  ): Promise<Balance> {
    try {
      const balance = await this.prisma.balance.update({
        where: {
          ownerId,
        },
        data: {
          withdrawableBalance: {
            decrement: amount,
          },
        },
      });
      return balance;
    } catch {
      throw new BalanceNotFoundException('owner id');
    }
  }

  async unHoldBalance(ownerId: string, amount: number): Promise<Balance> {
    try {
      const updatedBalance = await this.prisma.balance.update({
        where: {
          ownerId,
        },
        data: {
          pendingBalance: {
            decrement: amount,
          },
          withdrawableBalance: {
            increment: amount,
          },
        },
      });
      return updatedBalance;
    } catch {
      throw new BalanceNotFoundException('owner id');
    }
  }

  removeCashbackBalance(userId: string, amount: number) {
    return this.prisma.balance.update({
      where: {
        ownerId: userId,
      },
      data: {
        cashbackBalance: {
          decrement: amount,
        },
      },
    });
  }

  async handleAppliedVoucher(userId: string, voucherCode: string) {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetVoucherDataMessage,
      GetVoucherDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.VOUCHERS_MESSAGES.getVoucherData,
      new GetVoucherDataMessage({ userId, voucherCode }),
    );

    if (!success) throw error;

    const { amount, code, currency } = data;

    const {
      results: { data: cData, error: cError, success: cSuccess },
    } = await KafkaMessageHandler<
      any,
      GetCurrencyExchangeRateMessage,
      GetCurrencyExchangeRateMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.CURRENCY_MESSAGES.getCurrencyExchangeRate,
      new GetCurrencyExchangeRateMessage({
        targetCurrencyCode: currency,
      }),
    );

    if (!cSuccess) throw cError;

    const { rate } = cData;

    const convertedAmount = amount / rate;

    this.removeCashbackBalance(userId, convertedAmount);
  }
}
