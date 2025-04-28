import { IEvent } from '@nestjs/cqrs';
import { AuthorizationDecodedUser } from 'nest-utils';
import { Story } from 'prismaClient';

export class StoryViewedEvent implements IEvent {
  constructor(
    public story: Story,
    public user: AuthorizationDecodedUser,
  ) {}
}
