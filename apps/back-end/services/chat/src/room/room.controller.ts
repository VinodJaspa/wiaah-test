import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserJoinedRoom, UserLeftRoom } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { UserJoinedRoomEvent, UserLeftRoomEvent } from './events';

@Controller()
export class RoomController {
  constructor(private readonly eventBus: EventBus) {}

  @EventPattern(KAFKA_EVENTS.CHAT.userJoinedRoom)
  handleUserJoinedRoom(@Payload() event: UserJoinedRoom) {
    const {
      input: { roomId, userId },
    } = event;

    this.eventBus.publish<UserJoinedRoomEvent>(
      new UserJoinedRoomEvent(userId, roomId),
    );
  }

  @EventPattern(KAFKA_EVENTS.CHAT.userLeftRoom)
  handleUserLeftRoom(@Payload() event: UserLeftRoom) {
    const {
      input: { roomId, userId },
    } = event;

    this.eventBus.publish<UserLeftRoomEvent>(
      new UserLeftRoomEvent(userId, roomId),
    );
  }
}
