import { AuthorizationDecodedUser } from 'nest-utils';
import { ChangePasswordInput } from '../../dto';

export class ChangePasswordCommand {
  constructor(
    public input: ChangePasswordInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
