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

  @Mutation(() => Account)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountsService.create(createAccountInput);
  }

  @Query(() => [Account])
  findAll() {
    return this.accountsService.findAll();
  }

  @Query(() => Account)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountsService.update(
      updateAccountInput.id,
      updateAccountInput,
    );
  }

  @Mutation(() => Account)
  removeAccount(@Args('id', { type: () => String }) id: string) {
    return this.accountsService.remove(id);
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }): Promise<Account> {
    return this.accountsService.findOne(ref.id);
  }
}
