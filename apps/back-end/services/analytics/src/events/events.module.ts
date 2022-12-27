import { Module } from '@nestjs/common';
import { EventsResolver } from './events.resolver';
import { EventsController } from './events.controller';

@Module({
  providers: [EventsResolver],
  controllers: [EventsController],
})
export class EventsModule {}
