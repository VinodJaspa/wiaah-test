import { AuthorizationDecodedUser } from 'nest-utils';

export class ViewUserStoryQuery {
  constructor(public userId: string, public user: AuthorizationDecodedUser) {}
}
