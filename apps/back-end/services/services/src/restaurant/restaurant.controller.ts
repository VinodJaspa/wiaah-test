import { Controller, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { ContentSuspendedEvent, ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { Restaurant } from '@restaurant';
import { UpdateRestaurantStatusCommand } from '@restaurant/commands/impl';
import { RestaurantStatus, RESTAURANT_SERVICE_KEY } from './const';

@Controller()
export class RestaurantController {
  constructor(
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(RESTAURANT_SERVICE_KEY),
  )
  async handleRestaurantSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    const rest = await this.commandbus.execute<
      UpdateRestaurantStatusCommand,
      Restaurant
    >(
      new UpdateRestaurantStatusCommand(
        value.input.id,
        RestaurantStatus.suspended,
      ),
    );
    if (!rest) return;
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(RESTAURANT_SERVICE_KEY),
      new ContentSuspendedEvent({
        id: rest.id,
        type: RESTAURANT_SERVICE_KEY,
        byModeration: true,
        authorId: rest?.ownerId,
        reason: value.input?.reason,
      }),
    );
  }
}
