import { Resolver, Query, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@entities';
import { GetTransactionsInput } from '@dto';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';

@Resolver(() => Transaction)
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => [Transaction])
  getMyTransactions(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('myTransactionsArgs') input: GetTransactionsInput,
  ): Promise<Transaction[]> {
    return this.transactionsService.getUserTransactions(user.id, input);
  }
}
