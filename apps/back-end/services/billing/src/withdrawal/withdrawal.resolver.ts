import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { WithdrawalRequest } from './entities/withdrawal.entity';
import { PrismaService } from 'prismaService';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  GetMyWithdrawalRequestsInput,
  GetWithdrawalRequestsAdminInput,
} from './dto';
import { Prisma, WithdrawalStatus } from '@prisma-client';
import { EventBus } from '@nestjs/cqrs';
import { WithdrawalProcessedEvent } from './events';
import { Account } from '@entities';
import { FinancialAccount } from '../financial-account/entities';

@Resolver(() => WithdrawalRequest)
export class WithdrawalResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventbus: EventBus,
  ) {}

  @Query(() => [WithdrawalRequest])
  getMyWithdrawalRequests(
    @Args('args') args: GetMyWithdrawalRequestsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);

    return this.prisma.withdrawalRequest.findMany({
      where: {
        userId: user.id,
      },
      skip,
      take,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async processWithdrawalRequest(@Args('id') id: string) {
    const withdrawal = await this.prisma.withdrawalRequest.update({
      where: {
        id,
      },
      data: {
        status: WithdrawalStatus.processed,
      },
    });

    this.eventbus.publish(new WithdrawalProcessedEvent(withdrawal));

    return true;
  }

  @Query(() => [WithdrawalRequest])
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

  @ResolveField(() => Account)
  user(@Parent() req: WithdrawalRequest) {
    return {
      __typename: 'Account',
      id: req.userId,
    };
  }

  @ResolveField(() => FinancialAccount)
  financialAccount(@Parent() req: WithdrawalRequest) {
    return this.prisma.financialAccount.findUnique({
      where: {
        id: req.financialAccountId,
      },
    });
  }
}
