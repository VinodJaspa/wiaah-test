import { Balance } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { BalanceService } from './balance.service';

@Resolver(() => Balance)
@UseGuards(new GqlAuthorizationGuard([]))
export class BalanceResolver {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Balance)
  getMyBalance(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.balanceService.getUserBalance(user.id);
  }

  @Mutation((type) => Boolean)
  clearBalance() {
    return this.balanceService.clear();
  }

  @ResolveReference()
  resolve(ref: { __typename: string; ownerId: string; id: string }) {
    if (ref.id) {
      return this.prisma.balance.findUnique({
        where: {
          id: ref.id,
        },
      });
    }
    if (ref.ownerId) {
      return this.prisma.balance.findUnique({
        where: {
          ownerId: ref.ownerId,
        },
      });
    }
    return null;
  }
}
