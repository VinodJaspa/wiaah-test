export class IncrementUserMessagesInteractionCommand {
  constructor(
    public readonly sendById: string,
    public readonly sendToId: string,
  ) {}
}
