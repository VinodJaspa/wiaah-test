import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AffiliationCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateAffiliationPostCommand } from './commands';

@Controller()
export class AffiliationPostController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.AFFILIATION.affiliationEntryCreated)
  handleNewAffiliation(
    @Payload() { value }: { value: AffiliationCreatedEvent },
  ) {
    this.commandbus.execute(
      new CreateAffiliationPostCommand(
        { affiliationId: value.input.affiliationId },
        value.input.itemOwnerId,
      ),
    );
  }
}
