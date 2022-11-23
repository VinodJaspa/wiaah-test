import { ServiceWorkingSchedule } from 'prismaClient';

export class WorkingScheduleUpdatedEvent {
  constructor(public readonly schedule: ServiceWorkingSchedule) {}
}
