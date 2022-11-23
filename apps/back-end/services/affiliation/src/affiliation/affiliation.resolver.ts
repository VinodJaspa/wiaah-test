import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';

import { Affiliation } from '@affiliation/entities';
import {
  CreateAffiliationInput,
  UpdateAffiliationInput,
} from '@affiliation/dto';
import {
  CreateAffiliationCommand,
  DeleteAffiliationCommand,
  UpdateAffiliationCommand,
} from '@affiliation/commands';
import { GetAffliationsBySellerIdQuery } from '@affiliation/queries';

@Resolver(() => Affiliation)
@UseGuards(new GqlAuthorizationGuard(['seller']))
export class AffiliationResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
  ) {}

  @Mutation(() => Affiliation)
  createNewAffiliationProduct(
    @Args('args') args: CreateAffiliationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Affiliation> {
    return this.commandbus.execute<CreateAffiliationCommand, Affiliation>(
      new CreateAffiliationCommand(args, user.id),
    );
  }

  @Mutation(() => Affiliation)
  updateAffiliation(
    @Args('args') args: UpdateAffiliationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<UpdateAffiliationCommand, Affiliation>(
      new UpdateAffiliationCommand(args, user.id),
    );
  }

  @Mutation(() => Affiliation)
  deleteAffiliation(
    @Args('id', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<DeleteAffiliationCommand, Affiliation>(
      new DeleteAffiliationCommand(id, user.id),
    );
  }

  @Query(() => [Affiliation])
  getMyAffiliations(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Affiliation[]> {
    return this.querybus.execute<GetAffliationsBySellerIdQuery, Affiliation[]>(
      new GetAffliationsBySellerIdQuery(user.id),
    );
  }
}
