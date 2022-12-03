import { ICommand } from '@nestjs/cqrs';
import { AuthorizationDecodedUser } from 'nest-utils';
import { DeleteStoryInput } from 'src/story/dto';

export class DeleteStoryCommand implements ICommand {
  constructor(
    public input: DeleteStoryInput,
    public user: AuthorizationDecodedUser,
  ) {}
}
