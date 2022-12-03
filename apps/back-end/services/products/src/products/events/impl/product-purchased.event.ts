export class ProductPurchasedEvent {
  constructor(
    public readonly productId: string,
    public readonly purchaserUserId: string,
  ) {}
}
