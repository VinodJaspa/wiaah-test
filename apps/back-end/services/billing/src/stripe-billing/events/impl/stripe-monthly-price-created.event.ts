import { StripeProductType } from '@stripe-billing/types';

export class StripeMonthlyPriceCreatedEvent {
  constructor(
    public readonly input: {
      ogProductId: string;
      productType: StripeProductType;
      stripeProductId: string;
      price: number;
      stripePriceId: string;
    },
  ) {}
}
