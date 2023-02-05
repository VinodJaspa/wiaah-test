import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { SendMessageCommand, SendMessageToUserCommand } from './commands';
import { CreateMessageInput } from './dto';
import { ChatMessage } from './entities/message.entity';

@Resolver(() => ChatMessage)
export class MessageResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ChatMessage])
  async getRoomMessages(
    @Args('roomId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
    if (!room) throw new NotFoundException('Room not found');
    if (!room.members.some((v) => v.userId === user.id))
      throw new UnauthorizedException('You dont have access to this room');

    const msgs = await this.prisma.message.findMany({
      where: {
        roomId: id,
      },
    });

    return msgs;
  }

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
