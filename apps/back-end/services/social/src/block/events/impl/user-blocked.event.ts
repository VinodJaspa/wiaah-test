import { AuthorizationDecodedUser } from 'nest-utils';
import { BlockedUser } from 'prismaClient';

export class UserBlockedEvent {
  constructor(
    public readonly blockObj: BlockedUser,
    public readonly blocker: AuthorizationDecodedUser,
  ) {}
}
