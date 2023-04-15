export * from './impl';
import {
  UpdateUserWorkingScheduleCommandHandler,
  CreateUserWorkingScheduleCommandHandler,
} from './handlers';

export const workingScheduleCommandHandlers = [
  UpdateUserWorkingScheduleCommandHandler,
  CreateUserWorkingScheduleCommandHandler,
];
