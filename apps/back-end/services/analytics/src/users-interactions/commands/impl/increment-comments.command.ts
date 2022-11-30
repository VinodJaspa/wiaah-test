export class IncrementUserCommentsReplyInteractionCommand {
  constructor(
    public readonly commentedById: string,
    public readonly commentedToId: string,
  ) {}
}
