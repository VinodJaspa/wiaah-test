export class AcceptRequestedRefundCommand {
  constructor(
    public readonly requestId: string,
    public readonly userId: string,
  ) {}
}
