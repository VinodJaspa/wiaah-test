import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Account } from '@room/entities/extends';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';

import { SendMessageCommand, SendMessageToUserCommand } from './commands';
import { CreateMessageInput, GetMessagesByRoomIdInput } from './dto';
import { ChatMessage } from './entities/message.entity';

@Resolver(() => ChatMessage)
export class MessageResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ChatMessage])
  async getRoomMessages(
    @Args('args') args: GetMessagesByRoomIdInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: args.roomId,
      },
    });
    if (!room) throw new NotFoundException('Room not found');
    if (!room.members.some((v) => v.userId === user.id))
      throw new UnauthorizedException('You dont have access to this room');

    const msgs = await this.prisma.message.findMany({
      where: {
        roomId: args.roomId,
      },
      take: args.pagination.take,
      cursor: {
        id: args.pagination.cursor,
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

  @ResolveField(() => Account)
  user(@Parent() message: ChatMessage) {
    return {
      __typename: 'Account',
      id: message.userId,
    };
  }

  @ResolveField(() => [Account])
  mentions(@Parent() message: ChatMessage) {
    return message.mentionsUserIds.map((id) => ({
      __typename: 'Account',
      id,
    }));
  }
}
