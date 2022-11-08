import { AuthorizationDecodedUser } from 'nest-utils';
import { Story } from 'prismaClient';

export class UpdateUserFollowerStoryLastSeenAtCommand {
  constructor(public story: Story, public viewer: AuthorizationDecodedUser) {}
}
