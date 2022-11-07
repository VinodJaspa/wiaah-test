import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChatRoomRepository } from '@room/repository';
import { CanAccessRoomQuery } from '../impl';

@QueryHandler(CanAccessRoomQuery)
export class CanAccessRoomQueryHandler
  implements IQueryHandler<CanAccessRoomQuery>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}
  async execute({ roomId, userId }: CanAccessRoomQuery): Promise<boolean> {
    const res = await this.roomRepo.getRoomById(roomId);
    return res.membersUserIds.includes(userId);
  }
}
