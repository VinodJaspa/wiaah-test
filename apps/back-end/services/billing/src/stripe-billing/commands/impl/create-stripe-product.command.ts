export class CreateStripeProductCommand {
  constructor(
    public readonly name: string,
    public readonly productId: string,
    public readonly type: string,
  ) {}
}
