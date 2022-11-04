import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRoomRepository } from '../../repository';
import { IncrementRoomMembersUnSeenMessagesCommand } from '../impl/incrementRoomMembersUnseenMessages.command';

@CommandHandler(IncrementRoomMembersUnSeenMessagesCommand)
export class IncrementRoomMembersUnSeenMessagesCommandHandler
  implements ICommandHandler<IncrementRoomMembersUnSeenMessagesCommand>
{
  constructor(private readonly roomRepo: ChatRoomRepository) {}

  execute({
    roomId,
  }: IncrementRoomMembersUnSeenMessagesCommand): Promise<boolean> {
    return this.roomRepo.incrementRoomMembersUnSeenMessages(roomId);
  }
}
