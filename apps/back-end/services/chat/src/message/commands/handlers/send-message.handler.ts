import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ChatMessageSentEvent } from '../../events';
import { MessagesRepository } from '../../repository';
import { ChatMessage } from '../../entities';
import { SendMessageCommand } from '../impl';

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements ICommandHandler<SendMessageCommand>
{
  constructor(
    private readonly messageRepo: MessagesRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    input: { message, userId },
  }: SendMessageCommand): Promise<ChatMessage> {
    const msg = await this.messageRepo.createMessage(message, userId);
    this.eventbus.publish(new ChatMessageSentEvent(userId, msg));
    return msg;
  }
}
