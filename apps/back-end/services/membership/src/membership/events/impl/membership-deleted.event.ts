import { AuthorizationDecodedUser } from 'nest-utils';
import { Membership } from 'prismaClient';

export class MembershipDeletedEvent {
  constructor(
    public readonly membership: Membership,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
