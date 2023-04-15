import { ServiceWorkingSchedule } from '@prisma-client';

export class WorkingScheduleUpdatedEvent {
  constructor(public readonly schedule: ServiceWorkingSchedule) {}
}
