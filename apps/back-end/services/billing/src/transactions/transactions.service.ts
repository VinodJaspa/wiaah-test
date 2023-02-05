import { CreateTransactionInput, GetTransactionsInput } from '@dto';
import { Transaction } from '@entities';
import { TransactionNotFoundException } from '@exception';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { ExtractPagination } from 'nest-utils';
import { BalanceService } from 'src/balance/balance.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly balanceService: BalanceService,
  ) {}

  async getUserTransactions(
    userId: string,
    input: GetTransactionsInput,
  ): Promise<Transaction[]> {
    const { take, skip } = ExtractPagination(input.pagination);

    const filters: Prisma.TransactionWhereInput[] = [];

    if (input.status) filters.push({ status: input.status });

    const transctions = await this.prisma.transaction.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                from: userId,
              },
              {
                userId,
              },
            ],
          },
          ...filters,
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      take,
      skip,
    });

    return transctions;
  }

  async createTransaction(input: CreateTransactionInput): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        status: 'pending',
        from: input.from,
        userId: input.to,
        amount: input.amount,
        description: input.descirption || '',
        currency: input.currency,
      },
    });
    try {
      this.balanceService.addPendingBalance(input.to, input.amount);
    } catch {}
    return transaction;
  }

  async confirmTransactionSuccess(transactionId: string): Promise<Transaction> {
    try {
      const transaction = await this.prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          status: 'success',
        },
      });

      try {
        this.balanceService.unHoldBalance(
          transaction.userId,
          transaction.amount,
        );
      } catch {}

      return transaction;
    } catch {
      throw new TransactionNotFoundException('id');
    }
  }

  async confirmTransactionFailed(transactionId: string): Promise<Transaction> {
    try {
      const transaction = await this.prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          status: 'failed',
        },
      });
      return transaction;
    } catch {
      throw new TransactionNotFoundException('id');
    }
  }
}
