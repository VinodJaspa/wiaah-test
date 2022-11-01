import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { SendMessageCommand } from './commands';
import { CreateMessageInput } from './dto';
import { Message } from './entities/message.entity';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Message)
  SendMessage(
    @Args('sendMessageInput') args: CreateMessageInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Message> {
    return this.commandBus.execute<SendMessageCommand, Message>(
      new SendMessageCommand({ message: args, userId: user.id }),
    );
  }

  @Subscription(() => Message)
  onMessage(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return;
  }
}
