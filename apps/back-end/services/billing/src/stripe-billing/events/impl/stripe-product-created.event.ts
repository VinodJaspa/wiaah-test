export class StripeProductCreatedEvent {
  constructor(
    public input: {
      ogId: string;
      stripeProductId: string;
      type: string;
    },
  ) {}
}
