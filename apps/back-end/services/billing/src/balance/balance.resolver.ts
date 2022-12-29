import { Balance } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { BalanceService } from './balance.service';

@Resolver(() => Balance)
@UseGuards(new GqlAuthorizationGuard([]))
export class BalanceResolver {
  constructor(private readonly balanceService: BalanceService) {}

  @Query(() => Balance)
  getMyBalance(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.balanceService.getUserBalance(user.id);
  }

  @Mutation((type) => Boolean)
  clearBalance() {
    return this.balanceService.clear();
  }

  @Mutation((type) => Boolean)
  async getCashbackBalance(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    try {
      await this.balanceService.addCashbackBalance(user.id);
      return true;
    } catch {
      return false;
    }
  }
}
