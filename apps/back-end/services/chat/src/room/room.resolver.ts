import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChatRoom } from './entities/room.entity';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlPaginationInput,
} from 'nest-utils';
import { QueryBus } from '@nestjs/cqrs';
import { CanAccessRoomQuery, GetMyRoomsQuery } from './queries';
import { PrismaService } from 'prismaService';
import { ChatMessage } from '@message';
import { Account } from './entities/extends';
import { UseGuards } from '@nestjs/common';

@Resolver(() => ChatRoom)
@UseGuards(new GqlAuthorizationGuard([]))
export class RoomResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Boolean)
  canAccessRoom(
    @Args('roomId', { type: () => ID }) roomId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.querybus.execute<CanAccessRoomQuery, boolean>(
      new CanAccessRoomQuery(roomId, user.id),
    );
  }

  @Query(() => ChatRoom)
  getChatRoom(@Args('roomId') id: string) {
    return this.prisma.room.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => ChatRoom)
  getRoomWithUser(
    @Args('userId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.prisma.room.findFirst({
      where: {
        members: {
          every: {
            userId: {
              in: [id, user.id],
            },
          },
        },
        roomType: 'private',
      },
    });
  }

  @ResolveField(() => [ChatMessage])
  messages(@Args('args') args: GqlPaginationInput, @Parent() room: ChatRoom) {
    const { skip, take } = ExtractPagination(args);

    return this.prisma.message.findMany({
      where: {
        roomId: room.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });
  }

  @ResolveField(() => [Account])
  members(@Parent() room: ChatRoom) {
    return room.membersUserIds.map((id) => ({
      __typename: 'Account',
      id,
    }));
  }

  @Query(() => [ChatRoom])
  getMyChatRooms(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ChatRoom[]> {
    return this.querybus.execute<GetMyRoomsQuery, ChatRoom[]>(
      new GetMyRoomsQuery(user.id),
    );
  }
}
