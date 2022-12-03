import { StripeMetadataObjectType } from '@stripe-billing/types';

export const StripeMetadataTypeEnum: Record<
  StripeMetadataObjectType,
  StripeMetadataObjectType
> = {
  checkout: 'checkout',
};
