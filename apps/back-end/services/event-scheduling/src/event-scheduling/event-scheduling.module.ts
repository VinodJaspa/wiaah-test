import { Module } from '@nestjs/common';
import { EventSchedulingResolver } from './event-scheduling.resolver';

@Module({
  providers: [EventSchedulingResolver],
})
export class EventSchedulingModule {}
