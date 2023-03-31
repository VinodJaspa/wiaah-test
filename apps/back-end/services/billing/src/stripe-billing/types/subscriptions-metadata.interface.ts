import { StripeProductType } from './stripe-product-type.interface';

export type SubscriptionMetadata = {
  userId: string;
  itemId: string;
  endAt: string;
  startAt: string;
  membershipId: string;
};
