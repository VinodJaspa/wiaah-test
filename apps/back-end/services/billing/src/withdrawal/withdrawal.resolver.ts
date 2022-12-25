import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { WithdrawalRequest } from './entities/withdrawal.entity';
import { PrismaService } from 'prismaService';
import { UseGuards } from '@nestjs/common';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { GetWithdrawalRequestsAdminInput } from './dto';
import { Prisma, WithdrawalStatus } from '@prisma-client';

@Resolver(() => WithdrawalRequest)
export class WithdrawalResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async processWithdrawalRequest(@Args('id') id: string) {
    await this.prisma.withdrawalRequest.update({
      where: {
        id,
      },
      data: {
        status: WithdrawalStatus.processed,
      },
    });
    return true;
  }

  @Query()
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getWithdrawalRequests(@Args('args') args: GetWithdrawalRequestsAdminInput) {
    const filters: Prisma.WithdrawalRequestWhereInput[] = [];
    if (args.amount) {
      filters.push({
        amount: {
          gte: Math.floor(args.amount),
        },
      });
      filters.push({
        amount: {
          lte: Math.floor(args.amount) + 1,
        },
      });
    }

    if (args.processedAt) {
      filters.push({
        processedAt: {
          gte: new Date(new Date(args.processedAt).setHours(0)),
        },
      });

      filters.push({
        processedAt: {
          lte: new Date(new Date(args.processedAt).setHours(24)),
        },
      });
    }

    if (args.requestedAt) {
      filters.push({
        requestedAt: {
          gte: new Date(new Date(args.requestedAt).setHours(0)),
        },
      });

      filters.push({
        requestedAt: {
          lte: new Date(new Date(args.requestedAt).setHours(24)),
        },
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }

    return this.prisma.withdrawalRequest.findMany({
      where: {
        AND: filters,
      },
    });
  }
}
