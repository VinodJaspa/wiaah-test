import { CreateBlockInput } from '@block/dto';
import { AuthorizationDecodedUser } from 'nest-utils';

export class unBlockUserCommand {
  constructor(
    public readonly input: CreateBlockInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
