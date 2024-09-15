export class StripeAccountCreationException extends Error {
  constructor(message: string = 'Failed to create Stripe account') {
    super(message);
    this.name = 'StripeAccountCreationException';

    // Maintaining proper stack trace (for V8 engines like Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StripeAccountCreationException);
    }
  }
}
