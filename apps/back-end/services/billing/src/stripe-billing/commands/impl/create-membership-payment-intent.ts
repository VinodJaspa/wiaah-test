import { AuthorizationDecodedUser } from 'nest-utils';
import { CreateMembershipPaymentIntentInput } from '../../dto';

export class CreateMembershipPaymentIntentCommand {
  constructor(
    public readonly input: CreateMembershipPaymentIntentInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
