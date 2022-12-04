import { Controller, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { Restaurant } from '@restaurant';
import { ContentSuspendedEvent, ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { UpdateHealthCenterCommand } from '@health-center/commands';
import {
  HealthCenterStatus,
  HEALTH_CENTER_SERVICE_KEY,
} from '@health-center/const';

@Controller()
export class HealthCenterController {
  constructor(
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(HEALTH_CENTER_SERVICE_KEY),
  )
  async handleRestaurantSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    const center = await this.commandbus.execute<
      UpdateHealthCenterCommand,
      Restaurant
    >(
      new UpdateHealthCenterCommand(
        value.input.id,
        HealthCenterStatus.suspended,
      ),
    );

    if (!center) return;
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(HEALTH_CENTER_SERVICE_KEY),
      new ContentSuspendedEvent({
        id: center.id,
        type: HEALTH_CENTER_SERVICE_KEY,
        byModeration: true,
        authorId: center?.ownerId,
        reason: value.input?.reason,
      }),
    );
  }
}
