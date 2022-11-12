export class CreateStripeProductCommand {
  constructor(
    public input: {
      name: string;
      productId: string;
      type: string;
    },
  ) {}
}

export class StripeProductCommandRes {
  stripeProductId: string;
}
