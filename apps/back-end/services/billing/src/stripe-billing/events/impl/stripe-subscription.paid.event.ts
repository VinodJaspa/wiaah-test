export class StripeSubscriptionPaidEvent {
  constructor(
    public readonly input: {
      userId: string;
      itemId: string;
      itemType: string;
    },
  ) {}
}
