export * from './impl';
import {
  IncreaseUserActivityScoreCommandHandler,
  UpdateUserLastActiveCommandHandler,
  IncreaseUserActiveTimeCommandHandler,
} from './handler';

export const userActivityScoreCommandHandlers = [
  IncreaseUserActivityScoreCommandHandler,
  UpdateUserLastActiveCommandHandler,
  IncreaseUserActiveTimeCommandHandler,
];
