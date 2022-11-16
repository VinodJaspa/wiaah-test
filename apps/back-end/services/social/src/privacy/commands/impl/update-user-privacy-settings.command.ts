import { UpdateMyPrivacyInput } from '@privacy-settings/dto';
import { AuthorizationDecodedUser } from 'nest-utils';

export class UpdateUserPrivacySettingsCommand {
  constructor(
    public readonly input: UpdateMyPrivacyInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
