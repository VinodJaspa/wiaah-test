import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserLeftRoomEvent } from '../impl';
import { ChatRoomRepository } from '../../repository';

@EventsHandler(UserLeftRoomEvent)
export class UserLeftRoomEventHandler
  implements IEventHandler<UserLeftRoomEvent>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}

  handle({ roomId, userId }: UserLeftRoomEvent) {
    this.roomRepo.setRoomMemberOffline(userId, roomId);
  }
}
