export class IncreaseProductEarningsCommand {
  constructor(
    public readonly productId: string,
    public readonly earning: number,
  ) {}
}
