import { AuthorizationDecodedUser } from 'nest-utils';
import { UpdateMembershipInput } from '../../dto';

export class UpdateMembershipCommand {
  constructor(
    public readonly input: UpdateMembershipInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
