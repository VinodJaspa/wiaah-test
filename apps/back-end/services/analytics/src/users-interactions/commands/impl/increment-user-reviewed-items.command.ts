export class IncrementUserReviewedItemsCommand {
  constructor(
    public readonly userId: string,
    public readonly authorId: string,
  ) {}
}
