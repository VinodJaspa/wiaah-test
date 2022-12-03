import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { AccountVerification } from '@acc-verification/entities';
import { CreateAccountVerificationInput } from '@acc-verification/dto';
import { CreateAccountVerificationRequestCommand } from '@acc-verification/commands';
import { GetAccountVerificationRequestsQuery } from '@acc-verification/queries';

@Resolver(() => AccountVerification)
export class AccountVerificationResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  requestAccountVerification(
    @Args('args') args: CreateAccountVerificationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<
      CreateAccountVerificationRequestCommand,
      boolean
    >(new CreateAccountVerificationRequestCommand(args, user.id));
  }

  @Query(() => [AccountVerification])
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  getAccountVerificationRequests(): Promise<AccountVerification[]> {
    return this.querybus.execute<
      GetAccountVerificationRequestsQuery,
      AccountVerification[]
    >(new GetAccountVerificationRequestsQuery());
  }
}
