export class MigrateMembershipStripeIdCommand {
  constructor(
    public readonly stripePriceId: string,
    public readonly membershipId: string,
  ) {}
}
