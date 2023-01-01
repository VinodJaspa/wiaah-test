import { Resolver, Query, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@entities';
import { GetTransactionsInput } from '@dto';
import { GetTransactionsAdminInput } from './dto';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma-client';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserIdsByNameQuery, GetUserIdsByNameQueryRes } from './queries';

@Resolver(() => Transaction)
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) {}

  @Query(() => [Transaction])
  getMyTransactions(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('myTransactionsArgs') input: GetTransactionsInput,
  ): Promise<Transaction[]> {
    return this.transactionsService.getUserTransactions(user.id, input);
  }

  @Query(() => [Transaction])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getAll(@Args('args') args: GetTransactionsAdminInput) {
    const filters: Prisma.TransactionWhereInput[] = [];
    const { skip, take } = ExtractPagination(args.pagination);

    if (args.amount) {
      filters.push({
        amount: {
          gte: args.amount,
          lt: Math.floor(args.amount) + 1,
        },
      });
    }

    if (args.description) {
      filters.push({
        description: {
          contains: args.description,
        },
      });
    }
    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }

    if (args.seller) {
      const { ids } = await this.querybus.execute<
        GetUserIdsByNameQuery,
        GetUserIdsByNameQueryRes
      >(new GetUserIdsByNameQuery(args.seller, args.pagination));
      filters.push({
        userId: {
          in: ids,
        },
      });
    }

    return this.prisma.transaction.findMany({
      where: {
        AND: filters,
      },
      take,
      skip,
    });
  }
}
