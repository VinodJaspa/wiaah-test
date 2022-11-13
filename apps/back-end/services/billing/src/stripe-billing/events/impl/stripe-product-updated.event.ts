export class StripeProductUpdatedEvent {
  constructor(
    public readonly input: {
      ogId: string;
      type: string;
      stripeProductId: string;
    },
  ) {}
}
