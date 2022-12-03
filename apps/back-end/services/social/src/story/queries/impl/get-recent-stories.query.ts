import { AuthorizationDecodedUser } from 'nest-utils';

import { GetRecentStoriesInput } from '../../dto';

export class GetRecentStoriesQuery {
  constructor(
    public input: GetRecentStoriesInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
