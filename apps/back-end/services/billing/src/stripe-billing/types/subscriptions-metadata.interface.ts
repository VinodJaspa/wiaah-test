import { StripeProductType } from './stripe-product-type.interface';

export type SubscriptionMetadata = {
  userId: string;
  itemId: string;
  itemType: StripeProductType;
};
