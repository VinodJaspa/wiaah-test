import { AuthorizationDecodedUser } from 'nest-utils';
import { ChangePasswordInput } from '../../dto';

export class AccountPasswordChangedEvent {
  constructor(
    public user: AuthorizationDecodedUser,
    public input: ChangePasswordInput,
  ) {}
}
