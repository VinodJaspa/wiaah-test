import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { MessagesRepository } from '../../repository';
import { Message } from '../../entities';
import { SendMessageCommand } from '../impl';

@QueryHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements ICommandHandler<SendMessageCommand>
{
  constructor(private readonly messageRepo: MessagesRepository) {}

  execute({
    input: { message, userId },
  }: SendMessageCommand): Promise<Message> {
    return this.messageRepo.createMessage(message, userId);
  }
}
