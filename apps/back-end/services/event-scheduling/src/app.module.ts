import { Module } from '@nestjs/common';
import { EventSchedulingModule } from './event-scheduling/event-scheduling.module';

@Module({
  imports: [EventSchedulingModule],
})
export class AppModule {}
