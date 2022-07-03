import { Balance } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { BalanceService } from './balance.service';

@Resolver(() => Balance)
@UseGuards(new GqlAuthorizationGuard(['seller']))
export class BalanceResolver {
  constructor(private readonly balanceService: BalanceService) {}

  @Query(() => Balance)
  getMyBalance(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.balanceService.getUserBalance(user.id);
  }
}
