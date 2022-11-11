export class CreateStripeCustomerCommand {
  constructor(
    public email: string,
    public name: string,
    public accountId: string,
  ) {}
}
