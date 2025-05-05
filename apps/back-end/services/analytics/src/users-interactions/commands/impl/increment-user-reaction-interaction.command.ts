export class IncreamentUserPostReactionInteractionCommand {
  constructor(
    public reactedById: string,
    public reactedToId: string,
  ) {}
}
