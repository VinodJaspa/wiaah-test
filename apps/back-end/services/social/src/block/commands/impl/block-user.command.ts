import { CreateBlockInput } from '@block/dto';
import { AuthorizationDecodedUser } from 'nest-utils';

export class BlockUserCommand {
  constructor(
    public readonly input: CreateBlockInput,
    public readonly blocker: AuthorizationDecodedUser,
  ) {}
}
