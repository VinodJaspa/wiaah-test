import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUnblockedEvent } from '../impl';

@EventsHandler(UserUnblockedEvent)
export class UserUnblockedEventHandler
  implements IEventHandler<UserUnblockedEvent>
{
  handle({ block, user }: UserUnblockedEvent) {}
}
