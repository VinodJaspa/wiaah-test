import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { HotelStatus, HOTEL_ROOM_SERVICE_KEY } from '@hotel/const';
import { ContentSuspenseRequestEvent, ContentSuspendedEvent } from 'nest-dto';
import { SERVICES } from 'nest-utils';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateHotelRoomStatusCommand } from '@hotel/command/impl';
import { HotelRoom } from '@entities';

@Controller()
export class HotelController {
  constructor(
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(HOTEL_ROOM_SERVICE_KEY),
  )
  async handleHotelSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    const room = await this.commandbus.execute<
      UpdateHotelRoomStatusCommand,
      HotelRoom
    >(new UpdateHotelRoomStatusCommand(value.input.id, HotelStatus.suspended));
    if (!room) return;
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(HOTEL_ROOM_SERVICE_KEY),
      new ContentSuspendedEvent({
        id: room?.id,
        type: HOTEL_ROOM_SERVICE_KEY,
        byModeration: true,
        authorId: room?.sellerId,
        reason: value.input?.reason,
      }),
    );
  }
}
