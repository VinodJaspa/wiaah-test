import { Module } from '@nestjs/common';
import { EventSchedulingResolver } from './event-scheduling.resolver';
import { EventSchedulingController } from './event-scheduling.controller';

@Module({
  providers: [EventSchedulingResolver],
  controllers: [EventSchedulingController],
})
export class EventSchedulingModule {}
