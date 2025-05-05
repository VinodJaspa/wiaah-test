import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { UpdateAffiliationCommand } from './commands';
import {
  GetFilteredAffiliationsInput,
  GetUserAffiliationsInput,
  UpdateAffiliationAdminInput,
} from './dto';
import { Affiliation } from './entities';
import {
  GetAffliationsBySellerIdQuery,
  GetFilteredAffiliationsQuery,
} from './queries';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AffiliationAdminResolver {
  constructor(
    private commandbus: CommandBus,
    private querybus: QueryBus,
  ) {}

  @Query(() => [Affiliation])
  getUserAffiliations(@Args('args') args: GetUserAffiliationsInput) {
    return this.querybus.execute(
      new GetAffliationsBySellerIdQuery(args.userId, args.pagination),
    );
  }

  @Mutation(() => Boolean)
  adminUpdateAffiliation(
    @Args('updateAffilaition') input: UpdateAffiliationAdminInput,
  ) {
    return this.commandbus.execute(
      new UpdateAffiliationCommand(input, input.sellerId),
    );
  }

  @Query(() => [Affiliation])
  getFilteredAffiliations(@Args('filters') args: GetFilteredAffiliationsInput) {
    return this.querybus.execute(new GetFilteredAffiliationsQuery(args));
  }
}
