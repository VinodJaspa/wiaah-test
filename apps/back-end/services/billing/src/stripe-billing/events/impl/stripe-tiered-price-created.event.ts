import { TieredPrice } from '../../types';

export class StripeTieredPriceCreatedEvent {
  constructor(
    public readonly input: {
      ogProductId: string;
      productType: string;
      stripeProductId: string;
      prices: TieredPrice[];
      stripePriceId: string;
    },
  ) {}
}
