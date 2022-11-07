export * from './impl';
import {
  SendMessageCommandHandler,
  SendMessageToUserCommandHandler,
} from './handlers';

export const MessageCommandsHandlers = [
  SendMessageCommandHandler,
  SendMessageToUserCommandHandler,
];
