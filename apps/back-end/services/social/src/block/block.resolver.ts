import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { Block } from '@block/entities';
import { GetUserBlocklistQuery } from '@block/queries';
import { BlockUserCommand, unBlockUserCommand } from '@block/commands';
import { CreateBlockInput } from '@block/dto';
import { GetMyBlocklistInput } from './dto/get-my-block-list.input';

@Resolver(() => Block)
@UseGuards(new GqlAuthorizationGuard([]))
export class BlockResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
  ) {}

  @Query(() => [Block])
  getMyBlockList(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') args: GetMyBlocklistInput,
  ) {
    return this.querybus.execute<GetUserBlocklistQuery>(
      new GetUserBlocklistQuery(args, user),
    );
  }

  @Mutation(() => Boolean)
  blockUser(
    @Args('args') input: CreateBlockInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<BlockUserCommand, boolean>(
      new BlockUserCommand(input, user),
    );
  }

  @Mutation(() => Boolean)
  unblockUser(
    @Args('args') input: CreateBlockInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<unBlockUserCommand, boolean>(
      new unBlockUserCommand(input, user),
    );
  }
}
