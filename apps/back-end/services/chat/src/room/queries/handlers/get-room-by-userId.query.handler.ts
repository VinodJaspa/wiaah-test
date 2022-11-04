import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Room } from '../../entities';
import { ChatRoomRepository } from '../../repository';
import { GetRoomByUserIdQuery } from '../impl';

@QueryHandler(GetRoomByUserIdQuery)
export class GetRoomByUserIdQueryHandler
  implements IQueryHandler<GetRoomByUserIdQuery>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}

  async execute({
    reciverId,
    senderId,
  }: GetRoomByUserIdQuery): Promise<Room | null> {
    let res = await this.roomRepo.getPrivateRoomByUserId(senderId, reciverId);
    if (!res)
      res = await this.roomRepo.CreatePrivateChatRoom([senderId, reciverId]);

    return res;
  }
}
