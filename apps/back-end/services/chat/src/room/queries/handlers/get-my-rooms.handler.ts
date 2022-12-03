import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChatRoomRepository } from '../../repository/chat-room.repository';
import { ChatRoom } from '../../entities';
import { GetMyRoomsQuery } from '../impl';

@QueryHandler(GetMyRoomsQuery)
export class GetMyRoomsQueryHandler implements IQueryHandler<GetMyRoomsQuery> {
  constructor(private readonly roomRepo: ChatRoomRepository) {}

  execute({ userId }: GetMyRoomsQuery): Promise<ChatRoom[]> {
    return this.roomRepo.getUserRooms(userId);
  }
}
