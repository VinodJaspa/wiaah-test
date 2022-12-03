import { AuthorizationDecodedUser } from 'nest-utils';

export class CreateUserPrivacySettingsCommand {
  constructor(public readonly userId: string) {}
}
