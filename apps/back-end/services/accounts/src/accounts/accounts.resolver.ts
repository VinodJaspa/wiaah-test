import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './entities';
import { CreateAccountInput, UpdateAccountInput } from './dto';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query(() => [Account])
  findAll() {
    return this.accountsService.findAll();
  }

  @Query(() => Account)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.accountsService.findOne(id);
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }
}
