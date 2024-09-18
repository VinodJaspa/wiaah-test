import { KnownError, PublicErrorCodes } from 'nest-utils';
export class StripeAccountCreationException extends KnownError {
  constructor() {
    super('Stripe Account creation failed', PublicErrorCodes.badRequestData);
  }
}
