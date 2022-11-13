export class CreateStripeTieredPriceCommand {
  constructor(
    public input: {
      ogId: string;
      type: string;
      productId: string;
      prices: { limit: number; priceInCents: number }[];
      recurring: 'month' | 'year' | 'week';
    },
  ) {}
}
