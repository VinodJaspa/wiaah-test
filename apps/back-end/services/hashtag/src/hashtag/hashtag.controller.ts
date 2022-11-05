import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { KAFKA_EVENTS } from 'nest-utils';
import { HashtagUnUsedEvent, HashtagUsedEvent } from 'nest-dto';

import {
  DecrementHashtagUsageCommand,
  IncrementHashtagUsageCommand,
} from './commands';
import { Hashtag } from './entities';

@Controller()
export class HashtagController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.HASHTAG.hashtagUnUsed)
  handleHashtagUsedEvent(@Payload() value: HashtagUsedEvent) {
    return this.commandBus.execute<IncrementHashtagUsageCommand, Hashtag>(
      new IncrementHashtagUsageCommand(value.input.id),
    );
  }

  @EventPattern(KAFKA_EVENTS.HASHTAG.hashtagUsed)
  handleHashtagUnUsedEvent(@Payload() value: HashtagUnUsedEvent) {
    return this.commandBus.execute<DecrementHashtagUsageCommand, Hashtag>(
      new DecrementHashtagUsageCommand(value.input.id),
    );
  }
}
