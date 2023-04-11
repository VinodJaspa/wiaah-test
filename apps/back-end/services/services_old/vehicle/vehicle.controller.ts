import { Controller, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { ContentSuspendedEvent, ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { UpdateVehicleStatusCommand } from './commands';
import { VehicleStatus, VEHICLE_SERVICE_KEY } from './const';
import { VehicleService } from './entities';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(VEHICLE_SERVICE_KEY),
  )
  async handleRestaurantSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    const vehicle = await this.commandbus.execute<
      UpdateVehicleStatusCommand,
      VehicleService
    >(new UpdateVehicleStatusCommand(value.input.id, VehicleStatus.suspended));

    if (!vehicle) return;
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(VEHICLE_SERVICE_KEY),
      new ContentSuspendedEvent({
        id: vehicle.id,
        type: VEHICLE_SERVICE_KEY,
        byModeration: true,
        authorId: vehicle?.ownerId,
        reason: value.input?.reason,
      }),
    );
  }
}
