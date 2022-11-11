import { AuthorizationDecodedUser } from 'nest-utils';
import { Membership } from 'prismaClient';

export class MembershipCreatedEvent {
  constructor(
    public readonly membership: Membership,
    public readonly creator: AuthorizationDecodedUser,
  ) {}
}
