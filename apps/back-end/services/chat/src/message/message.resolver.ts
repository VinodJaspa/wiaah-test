import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

import { SendMessageCommand, SendMessageToUserCommand } from './commands';
import { CreateMessageInput } from './dto';
import { ChatMessage } from './entities/message.entity';

@Resolver(() => ChatMessage)
export class MessageResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ChatMessage)
  async sendMessage(
    @Args('sendMessageInput') args: CreateMessageInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ChatMessage> {
    const res = args.roomId
      ? await this.commandBus.execute<SendMessageCommand, ChatMessage>(
          new SendMessageCommand({
            message: { ...args, roomId: args.roomId },
            userId: user.id,
          }),
        )
      : await this.commandBus.execute<SendMessageToUserCommand, ChatMessage>(
          new SendMessageToUserCommand(user.id, args),
        );

    return res;
  }
}
