import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomsQueryHandlers } from './queries';
import { ChatRoomCommandHandlers } from './commands';
import { ChatRoomRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    RoomResolver,
    ChatRoomRepository,
    ...RoomsQueryHandlers,
    ...ChatRoomCommandHandlers,
  ],
})
export class RoomModule {}
