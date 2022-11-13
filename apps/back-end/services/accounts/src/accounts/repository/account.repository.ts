import { Injectable } from '@nestjs/common';
import { Account } from '@prisma-client';
import { PrismaService } from 'prismaService';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateAccount(id: string, input: Partial<Account>) {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
