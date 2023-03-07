import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AdminGetUserFinancialAccounts } from './dto/admn-get-user-financial-accounts';
import { FinancialAccount } from './entities/financial-account.entity';

@Resolver(() => FinancialAccount)
export class FinancialAccountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [FinancialAccount])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetUserFinancialAccounts(
    @Args('args') args: AdminGetUserFinancialAccounts,
  ) {
    return this.prisma.financialAccount.findMany({
      where: { ownerId: args.accountId },
    });
  }

  @Query(() => [FinancialAccount])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  getMyFinancialAccounts(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.financialAccount.findMany({
      where: {
        ownerId: user.id,
      },
    });
  }
}
