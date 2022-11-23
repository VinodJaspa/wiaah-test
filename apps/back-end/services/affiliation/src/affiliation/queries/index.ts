export * from './impl';
import {
  GetAffiliationItemSellerIdQueryHandler,
  GetAffliationsBySellerIdQueryHandler,
} from './handlers';

export const affiliationQueryHandlers = [
  GetAffiliationItemSellerIdQueryHandler,
  GetAffliationsBySellerIdQueryHandler,
];
