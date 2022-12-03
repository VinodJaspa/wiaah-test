export class IncrementUserProfileVisitsInteractionCommand {
  constructor(
    public readonly userId: string,
    public readonly profileAuthorId: string,
  ) {}
}
