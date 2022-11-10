import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

import { Membership } from './entities';
import { CreateMembershipInput } from './dto/create-membership.input';
import { UpdateMembershipInput } from './dto/update-membership.input';
import { CreateMembershipCommand, UpdateMembershipCommand } from './commands';
import { GetSubscriableMembershipsQuery } from './queries';

@Resolver(() => Membership)
export class MembershipResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Membership)
  createMembership(
    @Args('args') args: CreateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<CreateMembershipCommand, Membership>(
      new CreateMembershipCommand(args, user),
    );
  }

  @Mutation(() => Membership)
  updateMembership(
    @Args('args') args: UpdateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<UpdateMembershipCommand, Membership>(
      new UpdateMembershipCommand(args, user),
    );
  }

  @Query(() => [Membership])
  getSubscriableMemberships() {
    return this.queryBus.execute<GetSubscriableMembershipsQuery, Membership[]>(
      new GetSubscriableMembershipsQuery(),
    );
  }
}
