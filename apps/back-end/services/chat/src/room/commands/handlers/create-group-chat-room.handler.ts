import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRoomRepository } from '../../repository/chat-room.repository';
import { ChatRoom } from '../../entities';
import { CreatePrivateChatRoomCommand } from '../impl';

@CommandHandler(CreatePrivateChatRoomCommand)
export class CreateGroupChatRoomCommandHandler
  implements ICommandHandler<CreatePrivateChatRoomCommand>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}
  execute({ members }: CreatePrivateChatRoomCommand): Promise<ChatRoom> {
    return this.roomRepo.CreatePrivateChatRoom(members);
  }
}
