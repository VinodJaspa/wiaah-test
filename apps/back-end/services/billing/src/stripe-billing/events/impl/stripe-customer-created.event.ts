export class StripeCustomerCreatedEvent {
  constructor(
    public userId: string,
    public stripeCustomerId: string,
  ) {}
}
