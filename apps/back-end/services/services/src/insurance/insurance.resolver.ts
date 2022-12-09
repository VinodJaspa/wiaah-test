import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  AcceptInsuranceRequestCommand,
  RefuseInsuranceRequestCommand,
  RequestInsurancePaybackCommand,
} from './commands';
import { GetInsurancesInput } from './dto';
import { Insurance } from './entities/insurance.entity';
import { GetInsurancesByStatusQuery } from './queries';

@Resolver(() => Insurance)
export class InsuranceResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => [Insurance])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getInsurances(
    @Args('args') args: GetInsurancesInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetInsurancesByStatusQuery(args.status, args.pagination),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  requestInsurancePayBack(
    @Args('bookId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new RequestInsurancePaybackCommand(id, user.id),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  refuseInsurancePayBackRequest(
    @Args('bookId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new RefuseInsuranceRequestCommand(id, user.id),
    );
  }
  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  acceptInsurancePayBackRequest(
    @Args('bookId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new AcceptInsuranceRequestCommand(id, user.id),
    );
  }
}
