import { Query, Resolver } from '@nestjs/graphql';
import { Room } from './entities/room.entity';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { QueryBus } from '@nestjs/cqrs';
import { GetMyRoomsQuery } from './queries';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => [Room])
  getMyChatRooms(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Room[]> {
    return this.querybus.execute<GetMyRoomsQuery, Room[]>(
      new GetMyRoomsQuery(user.id),
    );
  }
}
