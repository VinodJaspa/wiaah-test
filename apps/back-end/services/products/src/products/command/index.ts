export * from './impl';
import { IncrementProductVendorSiteCountCommandHandler } from './handlers';

export const ProductCommandHandlers = [
  IncrementProductVendorSiteCountCommandHandler,
];
