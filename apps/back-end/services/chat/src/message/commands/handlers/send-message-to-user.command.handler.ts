import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { GetRoomByUserIdQuery, Room } from '@room';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { MessagesRepository } from '../../repository';
import { ChatMessage } from '../../entities';
import { SendMessageCommand, SendMessageToUserCommand } from '../impl';

@CommandHandler(SendMessageToUserCommand)
export class SendMessageToUserCommandHandler
  implements ICommandHandler<SendMessageToUserCommand>
{
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({
    userId,
    input,
  }: SendMessageToUserCommand): Promise<ChatMessage> {
    if (!input.userId)
      throw new BadRequestException('message reciver userid required');

    const room = await this.querybus.execute<GetRoomByUserIdQuery, Room>(
      new GetRoomByUserIdQuery(userId, input.userId),
    );

    if (!room)
      throw new InternalServerErrorException('error creating private room');

    const res = await this.commandBus.execute<SendMessageCommand, ChatMessage>(
      new SendMessageCommand({
        message: { ...input, roomId: room.id },
        userId,
      }),
    );

    return res;
  }
}
