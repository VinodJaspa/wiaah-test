import { AuthorizationDecodedUser } from 'nest-utils';

export class GetMyStoriesQuery {
  constructor(public user: AuthorizationDecodedUser) {}
}
