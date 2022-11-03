import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRoomRepository } from '../../repository/chat-room.repository';
import { Room } from '../../entities';
import { CreatePrivateChatRoomCommand } from '../impl';

@CommandHandler(CreatePrivateChatRoomCommand)
export class CreateGroupChatRoomCommandHandler
  implements ICommandHandler<CreatePrivateChatRoomCommand>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}
  execute({ members }: CreatePrivateChatRoomCommand): Promise<Room> {
    return this.roomRepo.CreatePrivateChatRoom(members);
  }
}
