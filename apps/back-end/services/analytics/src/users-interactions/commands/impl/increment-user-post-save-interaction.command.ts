export class IncrementUserPostSaveInteractionCommand {
  constructor(
    public readonly userId: string,
    public readonly authorId: string,
  ) {}
}
