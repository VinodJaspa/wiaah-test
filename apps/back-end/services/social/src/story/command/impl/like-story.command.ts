import { AuthorizationDecodedUser } from 'nest-utils';
import { LikeStoryInput } from '../../dto';

export class LikeStoryCommand {
  constructor(
    public input: LikeStoryInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
