import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { Block } from '@block/entities';
import { GetUserBlocklistQuery } from '@block/queries';
import { BlockUserCommand, unBlockUserCommand } from '@block/commands';
import { CreateBlockInput } from '@block/dto';
import { GetMyBlocklistInput } from './dto/get-my-block-list.input';
import { PrismaService } from 'prismaService';

@Resolver(() => Block)
@UseGuards(new GqlAuthorizationGuard([]))
export class BlockResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Block])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetUserBlockList(
    @Args('args') args: GetMyBlocklistInput,
    @Args('accountId') id: string,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);

    return this.prisma.blockedUser.findMany({
      where: {
        blockerUserId: id,
      },
      take,
      skip,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminRemvoeBlock(@Args('id') id: string) {
    try {
      const res = await this.prisma.blockedUser.delete({
        where: {
          id,
        },
      });

      return !!res;
    } catch (error) {
      return false;
    }
  }

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
