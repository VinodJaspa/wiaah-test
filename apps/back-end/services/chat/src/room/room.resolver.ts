import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ChatRoom } from './entities/room.entity';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { QueryBus } from '@nestjs/cqrs';
import { CanAccessRoomQuery, GetMyRoomsQuery } from './queries';
import { PrismaService } from 'prismaService';

@Resolver(() => ChatRoom)
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
  getChatRoom() {
    return this.querybus.execute;
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
