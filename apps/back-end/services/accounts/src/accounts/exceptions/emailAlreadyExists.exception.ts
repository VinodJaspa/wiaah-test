import { KnownError, PublicErrorCodes } from 'nest-utils';

export class EmailAlreadyExistsException extends KnownError {
  constructor() {
    super('Email already exists', PublicErrorCodes.resourceAlreadyExsits);
  }
}
