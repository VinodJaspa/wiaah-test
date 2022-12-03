export class IncreamentUserCommentReactionInteractionCommand {
  constructor(
    public readonly reactedById: string,
    public readonly reactedToId: string,
  ) {}
}
