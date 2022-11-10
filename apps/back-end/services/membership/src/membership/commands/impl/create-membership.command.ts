import { AuthorizationDecodedUser } from 'nest-utils';
import { CreateMembershipInput } from '../../dto';

export class CreateMembershipCommand {
  constructor(
    public readonly input: CreateMembershipInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
