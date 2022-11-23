export class GetUserProductReviewQuery {
  constructor(
    public readonly productId: string,
    public readonly userId: string,
  ) {}
}
