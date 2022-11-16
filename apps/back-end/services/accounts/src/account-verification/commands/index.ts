export * from './impl';
import { CreateAccountVerificationRequestCommandHandler } from './handlers';

export const accVerificationCommandHandlers = [
  CreateAccountVerificationRequestCommandHandler,
];
