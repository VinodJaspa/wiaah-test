import { KnownError, PublicErrorCodes } from 'nest-utils';

export class ConfirmPasswordDoesNotMatchException extends KnownError {
  constructor() {
    super(
      "Confirm Password and Password does'nt match",
      PublicErrorCodes.badRequestData,
    );
  }
}
