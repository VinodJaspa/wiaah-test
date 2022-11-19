import { StripeMetadata } from './stripe-metadata.interface';

export type CheckoutMetadataProduct = { id: string; qty: number; type: string };

export interface CheckoutMetadata extends StripeMetadata {
  sellers: {
    id: string;
    products: CheckoutMetadataProduct[];
  }[];
  buyerId: string;
}
