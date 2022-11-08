import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, ResolveReference, Mutation, Args } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  SERVICES,
} from 'nest-utils';

import { AccountsService } from './accounts.service';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @Mutation(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  editAccount(
    @Args('editAccountInput') input: UpdateAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.accountsService.update(input, user.id);
  }

  @UseGuards(new GqlAuthorizationGuard(['buyer']))
  @Mutation((type) => Boolean)
  switchToSeller(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.accountsService.switchToSeller(user.id);
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }
}
