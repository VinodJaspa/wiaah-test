export * from './impl';
import {
  GetActionByIdQueryHandler,
  GetUserActionsQueryHandler,
} from './handlers';

export const ActionQueryHandlers = [
  GetActionByIdQueryHandler,
  GetUserActionsQueryHandler,
];
