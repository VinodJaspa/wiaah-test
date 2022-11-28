import { CheckoutMetadata } from '@stripe-billing/types';

export class StripeCheckoutInvoicePaidEvent {
  constructor(public readonly meta: CheckoutMetadata) {}
}
