import { AuthorizationDecodedUser } from 'nest-utils';
import { Membership, MembershipTurnoverRule } from 'prismaClient';

export class MembershipCreatedEvent {
  constructor(
    public readonly membership: Membership & {
      turnover_rules: MembershipTurnoverRule[];
    },
    public readonly creator: AuthorizationDecodedUser,
  ) {}
}
