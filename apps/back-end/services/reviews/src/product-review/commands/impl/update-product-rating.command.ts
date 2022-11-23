export class UpdateProductRatingCommand {
  constructor(
    public readonly productId: string,
    public readonly rate: number,
    public readonly type: 'inc' | 'dec',
  ) {}
}
