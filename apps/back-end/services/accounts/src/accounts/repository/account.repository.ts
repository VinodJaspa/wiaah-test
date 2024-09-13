import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) { }

  async updateAccount(id: string, input: Prisma.AccountUpdateInput) {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: input,
    });
  }

  async findAccount(accountId: string) {
    return this.prisma.account.findUnique({ where: { id: accountId } });
  }
}
