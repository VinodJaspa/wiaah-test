import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPubsubService, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ChatRoomRepository } from '../../repository';
import { IncrementRoomMembersUnSeenMessagesCommand } from '../impl/incrementRoomMembersUnseenMessages.command';

@CommandHandler(IncrementRoomMembersUnSeenMessagesCommand)
export class IncrementRoomMembersUnSeenMessagesCommandHandler
  implements ICommandHandler<IncrementRoomMembersUnSeenMessagesCommand>
{
  constructor(
    private readonly pubsub: KafkaPubsubService,
    private readonly roomRepo: ChatRoomRepository,
  ) {}

  async execute({
    roomId,
  }: IncrementRoomMembersUnSeenMessagesCommand): Promise<boolean> {
    const [ids, room] = await this.roomRepo.incrementRoomMembersUnSeenMessages(
      roomId,
    );
    ids.forEach((id) =>
      this.pubsub.publish(
        KAFKA_EVENTS.SUBSCRIPTIONS.roomDataUpdated(id),
        this.roomRepo.formatChatRoomData(room, id),
      ),
    );
    return;
  }
}
