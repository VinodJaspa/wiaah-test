export class UserMembershipUpdatedEvent {
  constructor(
    public readonly userId: string,
    public readonly membershipId: string,
  ) {}
}
