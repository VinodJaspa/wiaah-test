export class StripeConnectedAccountCreatedEvent {
  constructor(public input: { userId: string; stripeId: string }) {}
}
