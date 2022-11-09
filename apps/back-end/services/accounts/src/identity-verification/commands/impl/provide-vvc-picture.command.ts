import { AuthorizationDecodedUser } from 'nest-utils';

export class ProvideVVCPictureCommand {
  constructor(public pic: string, public user: AuthorizationDecodedUser) {}
}
