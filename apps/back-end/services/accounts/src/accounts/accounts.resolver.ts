import { Inject, UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveReference,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  SERVICES,
} from 'nest-utils';

import { AccountsService } from './accounts.service';
import { GetBuyersAccountsInput, GetSellersAccountsInput } from '@accounts/dto';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @Query(() => [Account])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getSellers(@Args('getSellersInput') args: GetSellersAccountsInput) {
    return this.accountsService.findAll(args, accountType.SELLER);
  }

  @Query(() => [Account])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getBuyers(@Args('getBuyersInput') args: GetBuyersAccountsInput) {
    return this.accountsService.findAll(args, accountType.BUYER);
  }

  @Mutation(() => Account)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminEditAccount(
    @Args('editAccountInput') input: UpdateAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.accountsService.updateUnprotected(input, user.id);
  }

  @Mutation(() => Account)
  @UseGuards(new GqlAuthorizationGuard([]))
  editAccount(
    @Args('editAccountInput') input: UpdateAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.accountsService.updateProtected(input, user.id);
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }
}
