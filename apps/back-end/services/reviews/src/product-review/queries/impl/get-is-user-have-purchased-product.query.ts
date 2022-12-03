export class GetIsUserHavePurchasedProductQuery {
  constructor(
    public readonly userId: string,
    public readonly productId: string,
  ) {}
}
