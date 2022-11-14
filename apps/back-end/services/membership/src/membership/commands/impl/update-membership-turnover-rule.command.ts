import { UpdateMembershipTurnoverRuleInput } from '@membership/dto';
import { AuthorizationDecodedUser } from 'nest-utils';

export class UpdateMembershipTurnoverRuleCommand {
  constructor(
    public readonly input: UpdateMembershipTurnoverRuleInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
