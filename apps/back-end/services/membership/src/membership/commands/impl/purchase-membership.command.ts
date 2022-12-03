import { AuthorizationDecodedUser } from 'nest-utils';
import { PurchaseMembershipInput } from '../../dto';

export class PurchaseMembershipCommand {
  constructor(
    public readonly input: PurchaseMembershipInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
