import { KnownError, PublicErrorCodes } from 'nest-utils';

export class AccountCreationFailedException extends KnownError {
  constructor() {
    super('Account creation failed', PublicErrorCodes.badRequestData);
  }
}
