import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { FinancialAccount } from './entities/financial-account.entity';

@Resolver(() => FinancialAccount)
export class FinancialAccountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [FinancialAccount])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  getMyFinancialAccounts(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.financialAccount.findMany({
      where: {
        ownerId: user.id,
      },
    });
  }
}
