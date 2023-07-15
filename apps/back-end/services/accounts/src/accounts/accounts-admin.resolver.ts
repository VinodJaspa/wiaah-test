import { OnModuleInit, UseGuards } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma-client';
import {
  AccountType,
  accountType,
  AddToDate,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AccountsService } from './accounts.service';
import { AdminGetStaffAccountsInput } from './dto/admin-get-staff-accounts.input';
import {
  AdminCreateAdminAccountInput,
  AdminUpdateAdminAccountInput,
} from './dto/create-account.input';
import { DeclineSellerAccountRequest } from './dto/declineSellerAccountRequest.input';
import { GetAccountDeletionRequestsInput } from './dto/get-account-deletion-requests.input';
import { GetAdminPendingSellersInput } from './dto/get-admin-pending-sellers.input';
import { GetBuyersAccountsInput } from './dto/get-buyers-accounts.input';
import { GetFilteredSellersAccountsInput } from './dto/get-sellers-accounts.input';
import { SuspenseAccountAdminInput } from './dto/suspense-account-input';
import { UpdateSellerAccountAdminInput } from './dto/update-account.input';
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
  getFilteredSellers(
    @Args('getSellersInput') args: GetFilteredSellersAccountsInput,
  ) {
    return this.accountsService.findAll(args, accountType.SELLER);
  }

  @Query(() => [Account])
  getFilteredBuyers(@Args('getBuyersInput') args: GetBuyersAccountsInput) {
    return this.accountsService.findAll(args, accountType.BUYER);
  }

  @Mutation(() => Account)
  async adminEditAccount(
    @Args('editAccountInput') input: UpdateSellerAccountAdminInput,
  ) {
    const { password, ...rest } = input;

    const hashedPassword = await this.accountsService.hashPassword(password);

    const res = await this.prisma.account.update({
      where: {
        id: input.id,
      },
      data: { ...rest, password: hashedPassword },
    });

    return res;
  }

  @Query(() => Account)
  adminGetAccount(@Args('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Query(() => [Account])
  async getPendingSellers(@Args('args') args: GetAdminPendingSellersInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    let filters: Prisma.AccountWhereInput[] = [];

    if (args.name) {
      filters.push({
        OR: [
          {
            firstName: {
              contains: args.name,
            },
          },
          {
            lastName: {
              contains: args.name,
            },
          },
        ],
      });
    }

    if (args.CRN) {
      filters.push({
        companyRegisterationNumber: {
          contains: args.CRN,
        },
      });
    }

    if (args.email) {
      filters.push({
        email: {
          contains: args.email,
        },
      });
    }

    if (args.dateCreated) {
      filters.push({
        AND: [
          {
            createdAt: {
              gte: new Date(new Date(args.dateCreated).setHours(0)),
            },
          },
          {
            createdAt: {
              lte: AddToDate(new Date(new Date(args.dateCreated).setHours(0)), {
                days: 1,
              }),
            },
          },
        ],
      });
    }

    const res = await this.prisma.account.findMany({
      where: {
        AND: [
          {
            accountType: 'seller',
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
  async suspenseAccount(@Args('args') args: SuspenseAccountAdminInput) {
    const acc = await this.prisma.account.update({
      where: {
        id: args.userId,
      },
      data: {
        status: 'suspended',
        rejectReason: args.rejectReason || 'inappropriate activity',
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

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async acceptAccountDeletionRequest(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const res = await this.prisma.accountDeletionRequest.update({
        where: {
          id,
        },
        data: {
          status: 'approved',
          resolvedById: user.id,
        },
      });

      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async rejectAccountDeletionRequest(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const res = await this.prisma.accountDeletionRequest.update({
        where: {
          id,
        },
        data: {
          status: 'rejected',
          resolvedById: user.id,
        },
      });

      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  @Query(() => [Account])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN, accountType.MOD]))
  async adminGetStaffAccounts(
    @Args('args') args: AdminGetStaffAccountsInput,
  ): Promise<Account[]> {
    const { skip, take } = ExtractPagination(args.pagination);
    const res = await this.prisma.account.findMany({
      where: {
        accountType: {
          in: [accountType.ADMIN, accountType.MOD],
        },
      },
      take,
      skip,
    });

    return res;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminCreateStaffAccount(
    @Args('args') args: AdminCreateAdminAccountInput,
  ): Promise<boolean> {
    const res = await this.prisma.account.create({
      data: {
        ...args,
        accountType: args.type as unknown as AccountType,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminUpdateStaffAccount(
    @Args('args') args: AdminUpdateAdminAccountInput,
  ): Promise<boolean> {
    await this.prisma.account.update({
      where: {
        id: args.id,
      },
      data: {
        ...args,
        accountType: args.type as unknown as AccountType,
      },
    });

    return true;
  }
}
