export class IncrementUserSharesInteractionCommand {
  constructor(
    public readonly sharedById: string,
    public readonly sharedToId: string,
  ) {}
}
