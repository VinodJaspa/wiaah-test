export class GetIsOrderBuyerQuery {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly getOrder?: boolean,
  ) {}
}
