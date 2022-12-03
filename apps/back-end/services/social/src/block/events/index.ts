export * from './impl';
import { UserBlockedEventHandler, UserUnblockedEventHandler } from './handlers';

export const BlockEventHandlers = [
  UserBlockedEventHandler,
  UserUnblockedEventHandler,
];
