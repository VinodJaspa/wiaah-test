export class AcceptReceivedOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
  ) {}
}
