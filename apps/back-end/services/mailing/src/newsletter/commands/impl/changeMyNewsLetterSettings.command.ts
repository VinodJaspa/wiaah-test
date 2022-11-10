import { AuthorizationDecodedUser } from 'nest-utils';
import { UpdateNewsletterInput } from '../../dto';

export class ChangeMyNewsletterSettingsCommand {
  constructor(
    public readonly input: UpdateNewsletterInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
