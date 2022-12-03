import { AuthorizationDecodedUser } from 'nest-utils';
import { CreateIdentityVerificationInput } from '../../dto';

export class RequestIdentityVerificationCommand {
  constructor(
    public input: CreateIdentityVerificationInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
