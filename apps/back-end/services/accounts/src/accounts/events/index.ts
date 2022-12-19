export * from './impl';
import { AccountDeletionRequestCreatedEventHandler } from './handlers';

export const AccountEventHandlers = [AccountDeletionRequestCreatedEventHandler];
