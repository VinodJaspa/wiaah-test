export * from './impl';
import {
  VendorExternalLinkClickedEventHandler,
  ProductPurchasedEventHandler,
  ProductStatusUpdatedEventHandler,
} from './handlers';

export const productEventHandlers = [
  VendorExternalLinkClickedEventHandler,
  ProductPurchasedEventHandler,
  ProductStatusUpdatedEventHandler,
];
