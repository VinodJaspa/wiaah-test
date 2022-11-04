import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { CqrsModule } from '@nestjs/cqrs';

import { RoomsQueryHandlers } from './queries';
import { ChatRoomCommandHandlers } from './commands';
import { ChatRoomRepository } from './repository';
import { RoomController } from './room.controller';
import { RoomEventHandlers } from './events';
import { ChatRoomSagas } from './saga';

@Module({
  imports: [CqrsModule],
  providers: [
    RoomResolver,
    ChatRoomRepository,
    ...RoomsQueryHandlers,
    ...ChatRoomCommandHandlers,
    ...RoomEventHandlers,
    ...ChatRoomSagas,
  ],
  controllers: [RoomController],
})
export class RoomModule {}
