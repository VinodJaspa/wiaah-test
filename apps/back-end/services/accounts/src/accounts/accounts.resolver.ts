import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { AccountsService } from './accounts.service';
import { Account } from './entities';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query(() => [Account])
  getAccounts() {
    return this.accountsService.findAll();
  }

  @Query(() => Account)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.accountsService.findOne(id);
  }

  @Mutation((type) => Boolean)
  DeleteAllAccounts() {
    return this.accountsService.deleteAll();
  }

  @UseGuards(GqlAuthorizationGuard)
  @Mutation((type) => Boolean)
  switchToSeller(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.accountsService.switchToSeller(user.id);
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }
}
