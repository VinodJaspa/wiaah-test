import { Resolver } from '@nestjs/graphql';
import { EventScheduling } from './entities/event-scheduling.entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEventSchedulingInput } from './dto/create-event-scheduling.input';
import { UpdateEventSchedulingInput } from './dto/update-event-scheduling.input';

@Resolver(() => EventScheduling)
export class EventSchedulingResolver {
  constructor(private readonly commandbus: CommandBus) {}
}
