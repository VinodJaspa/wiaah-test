export * from './impl';
import {
  VendorExternalLinkClickedEventHandler,
  ProductPurchasedEventHandler,
} from './handlers';

export const productEventHandlers = [
  VendorExternalLinkClickedEventHandler,
  ProductPurchasedEventHandler,
];
