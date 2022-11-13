export class UpdateUserMembershipCommand {
  constructor(
    public readonly userId: string,
    public readonly membershipId: string,
  ) {}
}
