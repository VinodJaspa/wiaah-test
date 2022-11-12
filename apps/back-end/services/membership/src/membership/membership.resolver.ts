import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

import { Membership } from './entities';
import { CreateMembershipInput, PurchaseMembershipInput } from './dto';
import { UpdateMembershipInput } from './dto';
import { CreateMembershipCommand, UpdateMembershipCommand } from './commands';
import { GetSubscriableMembershipsQuery } from './queries';

@Resolver(() => Membership)
export class MembershipResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Membership)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  createMembership(
    @Args('args') args: CreateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<CreateMembershipCommand, Membership>(
      new CreateMembershipCommand(args, user),
    );
  }

  @Mutation(() => Membership)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
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
