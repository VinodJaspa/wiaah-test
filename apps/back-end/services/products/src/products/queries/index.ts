export * from './impl';
import {
  GetCanPreformBuyerToProductActionQueryHandler,
  GetProductSellerMembershipIdQueryHandler,
  GetProductVendorLinkQueryHandler,
} from './handlers';

export const productsQueryHandlers = [
  GetCanPreformBuyerToProductActionQueryHandler,
  GetProductSellerMembershipIdQueryHandler,
  GetProductVendorLinkQueryHandler,
];
