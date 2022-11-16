import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserBlockedEvent } from '@block/events/impl';

@EventsHandler(UserBlockedEvent)
export class UserBlockedEventHandler
  implements IEventHandler<UserBlockedEvent>
{
  constructor() {}

  handle({ blockObj, blocker }: UserBlockedEvent) {}
}
