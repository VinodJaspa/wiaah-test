export class UpdateMembershipUsageCommand {
  constructor(
    public readonly membershipSubscriptionId: string,
    public readonly usage: number,
  ) {}
}
