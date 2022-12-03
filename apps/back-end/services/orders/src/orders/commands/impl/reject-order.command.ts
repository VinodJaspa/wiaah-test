export class RejectOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly reason?: string,
  ) {}
}
