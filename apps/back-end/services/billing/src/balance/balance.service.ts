import { Balance } from '@entities';
import { BalanceNotFoundException } from '@exception';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, KAFKA_MESSAGES, KAFKA_SERVICE_TOKEN } from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { BalanceCreatedEvent } from 'nest-dto';

@Injectable()
export class BalanceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

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
}
