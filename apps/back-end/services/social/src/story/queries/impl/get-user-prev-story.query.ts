import { AuthorizationDecodedUser } from 'nest-utils';

export class GetUserPrevStoryQuery {
  constructor(public storyId: string, public user: AuthorizationDecodedUser) {}
}
