import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HashtagCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateHashtagElasticDocumentCommand } from './commands';

@Controller()
export class SearchHashtagController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.HASHTAG.hashtagCreated)
  handleHashtagCreated(@Payload() event: HashtagCreatedEvent) {
    return this.commandbus.execute<CreateHashtagElasticDocumentCommand>(
      new CreateHashtagElasticDocumentCommand({
        dbId: event.input.id,
        name: event.input.name,
      }),
    );
  }
}
