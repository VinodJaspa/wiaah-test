import { Controller, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { ContentSuspendedEvent, ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { UpdateBeautyCenterStatusCommand } from './commands';
import { BeautyCenterStatus, BEAUTY_CENTER_SERVICE_KEY } from './const';
import { BeautyCenter } from './entities';

@Controller()
export class BeautyCenterController {
  constructor(
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(BEAUTY_CENTER_SERVICE_KEY),
  )
  async handleRestaurantSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    const center = await this.commandbus.execute<
      UpdateBeautyCenterStatusCommand,
      BeautyCenter
    >(
      new UpdateBeautyCenterStatusCommand(
        value.input.id,
        BeautyCenterStatus.suspended,
      ),
    );

    if (!center) return;
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(BEAUTY_CENTER_SERVICE_KEY),
      new ContentSuspendedEvent({
        id: center.id,
        type: BEAUTY_CENTER_SERVICE_KEY,
        byModeration: true,
        authorId: center?.ownerId,
        reason: value.input?.reason,
      }),
    );
  }
}
