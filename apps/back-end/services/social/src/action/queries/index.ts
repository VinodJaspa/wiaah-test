export * from './impl';
import {
  GetActionByIdQueryHandler,
  GetUserActionQueryHandler,
} from './handlers';

export const ActionQueryHandlers = [
  GetActionByIdQueryHandler,
  GetUserActionQueryHandler,
];
