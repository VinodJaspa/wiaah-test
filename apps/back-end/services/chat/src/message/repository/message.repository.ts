import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { CreateMessageInput } from '../dto';
import { ChatMessage } from '../entities';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(
    messageInput: Omit<CreateMessageInput, 'roomId'> & { roomId: string },
    userId: string,
  ): Promise<ChatMessage> {
    const message = await this.prisma.message.create({
      data: {
        ...messageInput,
        userId,
      },
    });

    return message;
  }
}
