export class StripeSubscriptionPastDueEvent {
  constructor(
    public readonly userId: string,
    public readonly stripeSubid: string,
  ) {}
}
