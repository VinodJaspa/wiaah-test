import { AuthorizationDecodedUser } from 'nest-utils';

export class GetUserBlocklistQuery {
  constructor(public readonly user: AuthorizationDecodedUser) {}
}
