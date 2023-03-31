export class StripeSubscriptionActivatedEvent {
  constructor(
    public readonly input: {
      userId: string;
      itemId: string;
      startAt: string;
      endAt: string;
      membershipId: string;
    },
  ) {}
}
