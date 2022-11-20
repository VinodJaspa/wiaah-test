export class DeleteProductReviewCommand {
  constructor(
    public readonly reviewId: string,
    public readonly userId: string,
  ) {}
}
