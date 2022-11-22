import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { workingScheduleCommandHandlers } from './commands';
import { workingScheduleEventHandlers } from './events';
import { workingScheduleQueryHandlers } from './queries';
import { WorkingScheduleRepository } from './repository';
import { WorkingScheduleResolver } from './working-schedule.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    WorkingScheduleResolver,
    WorkingScheduleRepository,
    ...workingScheduleCommandHandlers,
    ...workingScheduleQueryHandlers,
    ...workingScheduleEventHandlers,
  ],
})
export class WorkingScheduleModule {}
