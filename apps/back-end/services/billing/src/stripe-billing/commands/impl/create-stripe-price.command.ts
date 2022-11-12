import { StripeProductType } from '@stripe-billing/types';

export class CreateStripeMonthlyPriceCommand {
  constructor(
    public readonly input: {
      stripeProductId: string;
      productOgId: string;
      priceInCents: number;
      productType: StripeProductType;
    },
  ) {}
}
