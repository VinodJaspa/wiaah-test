import { AuthorizationDecodedUser } from 'nest-utils';
import { BlockedUser } from 'prismaClient';

export class UserUnblockedEvent {
  constructor(
    public readonly block: BlockedUser,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
