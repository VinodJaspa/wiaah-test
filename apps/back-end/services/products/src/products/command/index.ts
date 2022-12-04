export * from './impl';
import {
  IncrementProductVendorSiteCountCommandHandler,
  DeleteProductsCommandHandler,
  IncreaseProductEarningsCommandHandler,
  IncrementProductSalesCommandHandler,
  UpdateProductStatusCommandHandler,
} from './handlers';

export const ProductCommandHandlers = [
  IncrementProductVendorSiteCountCommandHandler,
  DeleteProductsCommandHandler,
  IncreaseProductEarningsCommandHandler,
  IncrementProductSalesCommandHandler,
  UpdateProductStatusCommandHandler,
];
