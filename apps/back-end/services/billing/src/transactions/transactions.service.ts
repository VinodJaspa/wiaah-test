import { GetTransactionsInput } from '@dto';
import { Transaction } from '@entities';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserTransactions(userId: string, input: GetTransactionsInput) {
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
                to: userId,
              },
            ],
          },
          ...filters,
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: input.take || 10,
    });

    return transctions;
  }
}
