export class DeleteAffiliationCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
