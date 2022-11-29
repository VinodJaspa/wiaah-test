export class IncrementUserMentionInteractionCommand {
  constructor(
    public readonly userId: string,
    public readonly mentionedId: string,
  ) {}
}
