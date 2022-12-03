import {
  StripeMetadataObjectType,
  StripeProductType,
} from '@stripe-billing/types';
export const ProductTypeEnum: Record<StripeProductType, StripeProductType> = {
  membership: 'membership',
  product: 'product',
  service: 'service',
};

export const StripeMetadataType: Record<
  StripeMetadataObjectType,
  StripeMetadataObjectType
> = {
  checkout: 'checkout',
};
