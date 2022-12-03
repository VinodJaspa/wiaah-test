import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRoomRepository } from '../../repository/chat-room.repository';
import { ChatRoom } from '../../entities';
import { CreateGroupChatRoomCommand } from '../impl';

@CommandHandler(CreateGroupChatRoomCommand)
export class CreatePrivateChatRoomCommandHandler
  implements ICommandHandler<CreateGroupChatRoomCommand>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}
  execute({ members }: CreateGroupChatRoomCommand): Promise<ChatRoom> {
    return this.roomRepo.CreateGroupChatRoom(members);
  }
}
