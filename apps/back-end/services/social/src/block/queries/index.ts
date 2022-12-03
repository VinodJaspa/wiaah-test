export * from './impl';
import {
  GetUserBlocklistQueryHandler,
  GetIsUserBlockedQueryHandler,
} from './handlers';

export const blockQueryHandlers = [
  GetUserBlocklistQueryHandler,
  GetIsUserBlockedQueryHandler,
];
