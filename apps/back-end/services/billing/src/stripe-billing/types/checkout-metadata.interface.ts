import { StripeMetadata } from './stripe-metadata.interface';

export type CheckoutMetadataProduct = { id: string; type: string };

export interface CheckoutMetadata extends StripeMetadata {
  sellers: {
    id: string;
    products: CheckoutMetadataProduct[];
  }[];
  buyerId: string;
}
