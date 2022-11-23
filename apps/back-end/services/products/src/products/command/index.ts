export * from './impl';
import {
  IncrementProductVendorSiteCountCommandHandler,
  DeleteProductsCommandHandler,
  IncreaseProductEarningsCommandHandler,
} from './handlers';

export const ProductCommandHandlers = [
  IncrementProductVendorSiteCountCommandHandler,
  DeleteProductsCommandHandler,
  IncreaseProductEarningsCommandHandler,
];
