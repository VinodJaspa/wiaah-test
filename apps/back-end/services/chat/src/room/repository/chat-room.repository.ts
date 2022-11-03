import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { Room as PrismaChatRoom } from '@prisma-client';

import { Room } from '../entities';

@Injectable()
export class ChatRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async CreatePrivateChatRoom(membersIds: string[]): Promise<Room> {
    const res = await this.prisma.room.create({
      data: {
        roomType: 'private',
        members: membersIds.map((v) => ({
          userId: v,
          lastSeenDate: new Date(),
          unSeenNum: 0,
        })),
      },
    });

    return {
      ...res,
      members: [],
      membersUserIds: res.members.map((v) => v.userId),
      unSeenMessages: 0,
    };
  }

  async CreateGroupChatRoom(membersIds: string[]): Promise<Room> {
    const res = await this.prisma.room.create({
      data: {
        roomType: 'group',
        members: membersIds.map((v) => ({
          userId: v,
          lastSeenDate: new Date(),
          unSeenNum: 0,
        })),
      },
      include: {
        messages: true,
      },
    });
    return this.formatChatRoomData(res);
  }

  async getUserRooms(userId: string): Promise<Room[]> {
    const res = await this.prisma.room.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    });

    return res.map((v) => this.formatChatRoomData(v));
  }

  formatChatRoomData({ members, ...rest }: PrismaChatRoom): Room {
    return {
      ...rest,
      membersUserIds: members.map((v) => v.userId),
      unSeenMessages: 0,
    };
  }
}
