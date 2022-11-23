export class CreateProductRatingCommand {
  constructor(
    public readonly productId: string,
    public readonly sellerId: string,
  ) {}
}
