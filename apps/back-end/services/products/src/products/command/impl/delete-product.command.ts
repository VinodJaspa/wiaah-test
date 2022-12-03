export class DeleteProductCommand {
  constructor(
    public readonly productId: string,
    public readonly userId: string,
  ) {}
}
