import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserJoinedRoomEvent } from '../impl';
import { ChatRoomRepository } from '../../repository';

@EventsHandler(UserJoinedRoomEvent)
export class UserJoinedRoomEventHandler
  implements IEventHandler<UserJoinedRoomEvent>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}

  handle({ roomId, userId }: UserJoinedRoomEvent) {
    this.roomRepo.setRoomMemberOnline(userId, roomId);
  }
}
