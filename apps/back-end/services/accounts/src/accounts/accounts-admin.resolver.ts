import { UseGuards } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma-client';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlPaginationInput,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AccountsService } from './accounts.service';
import { DeclineSellerAccountRequest } from './dto/declineSellerAccountRequest.input';
import { GetAccountDeletionRequestsInput } from './dto/get-account-deletion-requests.input';
import { GetBuyersAccountsInput } from './dto/get-buyers-accounts.input';
import { GetSellersAccountsInput } from './dto/get-sellers-accounts.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountDeletionRequest } from './entities/account-deletion-request.entity';
import { Account } from './entities/account.entity';
import {
  AccountSuspendedEvent,
  SellerAccountRequestDeclinedEvent,
} from './events';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AccountsAdminResolver {
  constructor(
    private prisma: PrismaService,
    private eventBus: EventBus,
    private readonly accountsService: AccountsService,
  ) {}

  @Query(() => [Account])
  getSellers(@Args('getSellersInput') args: GetSellersAccountsInput) {
    return this.accountsService.findAll(args, accountType.SELLER);
  }

  @Query(() => [Account])
  getBuyers(@Args('getBuyersInput') args: GetBuyersAccountsInput) {
    return this.accountsService.findAll(args, accountType.BUYER);
  }

  @Mutation(() => Account)
  adminEditAccount(
    @Args('editAccountInput') input: UpdateAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.accountsService.updateUnprotected(input, user.id);
  }

  @Query(() => [Account])
  async getPendingSellers(@Args('pagination') pagination: GqlPaginationInput) {
    const { skip, take } = ExtractPagination(pagination);
    const res = await this.prisma.account.findMany({
      where: {
        AND: [
          {
            type: 'seller',
          },
          {
            status: 'pending',
          },
        ],
      },
      take,
      skip,
    });
    return res;
  }

  @Mutation(() => Boolean)
  async acceptSellerAccount(@Args('id') id: string) {
    await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        status: 'active',
      },
    });
    return true;
  }

  @Mutation(() => Boolean)
  async declineSellerAccount(@Args('args') args: DeclineSellerAccountRequest) {
    const account = await this.prisma.account.update({
      where: {
        id: args.id,
      },
      data: {
        status: 'refused',
        rejectReason: args.reason,
      },
    });

    this.eventBus.publish(new SellerAccountRequestDeclinedEvent(account));

    return true;
  }

  @Mutation(() => Boolean)
  async suspenseAccount(@Payload('id') id: string) {
    const acc = await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        status: 'suspended',
        rejectReason: 'inappropriate activity',
      },
    });

    this.eventBus.publish(new AccountSuspendedEvent(acc));
    return true;
  }

  @Query(() => [AccountDeletionRequest])
  async getAccountDeletionRequests(
    @Args('args') args: GetAccountDeletionRequestsInput,
  ) {
    const filters: Prisma.AccountDeletionRequestWhereInput[] = [];

    if (args.username) {
      filters.push({
        account: {
          firstName: { contains: args.username },
        },
      });
      filters.push({
        account: {
          lastName: { contains: args.username },
        },
      });
    }

    if (args.email) {
      filters.push({
        account: {
          email: {
            contains: args.email,
          },
        },
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.dateAdded) {
      filters.push({
        AND: [
          {
            createdAt: { gte: new Date(new Date(args.dateAdded).setHours(0)) },
          },
          {
            createdAt: {
              lte: new Date(new Date(args.dateAdded).setHours(23, 59)),
            },
          },
        ],
      });
    }

    const { skip, take } = ExtractPagination(args.pagination);
    const res = await this.prisma.accountDeletionRequest.findMany({
      where: {
        AND: filters,
      },
      take,
      skip,
    });

    return res || [];
  }
}
