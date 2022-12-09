export * from './impl';
import {
  UpdateUserMembershipCommandHandler,
  IncreamentUserProductsCountHandler,
  IncreamentUserSalesCommandHandler,
} from './handlers';

export const accountCommandHandlers = [
  UpdateUserMembershipCommandHandler,
  IncreamentUserProductsCountHandler,
  IncreamentUserSalesCommandHandler,
];
