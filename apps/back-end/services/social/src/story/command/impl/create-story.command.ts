import { AuthorizationDecodedUser } from 'nest-utils';
import { CreateStoryInput } from 'src/story/dto';

export class CreateStoryCommand {
  constructor(
    public input: CreateStoryInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
