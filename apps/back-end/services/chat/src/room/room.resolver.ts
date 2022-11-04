import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Room } from './entities/room.entity';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { QueryBus } from '@nestjs/cqrs';
import { CanAccessRoomQuery, GetMyRoomsQuery } from './queries';
import { PrismaService } from 'prismaService';

@Resolver(() => Room)
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

  @Query(() => [Room])
  getMyChatRooms(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Room[]> {
    return this.querybus.execute<GetMyRoomsQuery, Room[]>(
      new GetMyRoomsQuery(user.id),
    );
  }
}
