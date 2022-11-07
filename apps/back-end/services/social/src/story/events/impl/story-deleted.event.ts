import { IQuery } from '@nestjs/cqrs';
import { AuthorizationDecodedUser } from 'nest-utils';
import { Story } from 'prismaClient';

export class StoryDeletedEvent implements IQuery {
  constructor(public story: Story, public user: AuthorizationDecodedUser) {}
}
