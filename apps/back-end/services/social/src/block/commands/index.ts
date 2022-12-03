export * from './impl';
import { BlockUserCommandHandler, unBlockUserCommandHandler } from './handlers';

export const blockCommandHandlers = [
  BlockUserCommandHandler,
  unBlockUserCommandHandler,
];
