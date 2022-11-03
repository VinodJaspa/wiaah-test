import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { CreateMessageInput } from '../dto';
import { Message } from '../entities';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(
    messageInput: CreateMessageInput,
    userId: string,
  ): Promise<Message> {
    const message = await this.prisma.message.create({
      data: {
        ...messageInput,
        userId,
      },
    });

    return message;
  }
}
