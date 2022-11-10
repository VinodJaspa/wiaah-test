import { AuthorizationDecodedUser } from 'nest-utils';
import { GetStorySeenByInput } from '../../dto';

export class GetStoryViewsQuery {
  constructor(
    public input: GetStorySeenByInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
