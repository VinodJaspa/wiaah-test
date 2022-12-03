import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { Room as PrismaChatRoom, Room } from '@prisma-client';

import { ChatRoom } from '../entities';

@Injectable()
export class ChatRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async CreatePrivateChatRoom(membersIds: string[]): Promise<ChatRoom> {
    const res = await this.prisma.room.create({
      data: {
        roomType: 'private',
        members: membersIds.map((v) => ({
          userId: v,
          unSeenNum: 0,
          online: false,
        })),
      },
    });

    res.members.at(0);
    return {
      ...res,
      members: [],
      membersUserIds: res.members.map((v) => v.userId),
      unSeenMessages: 0,
    };
  }

  async CreateGroupChatRoom(membersIds: string[]): Promise<ChatRoom> {
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

  async getUserRooms(userId: string): Promise<ChatRoom[]> {
    const res = await this.prisma.room.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    });

    return res.map((v) => this.formatChatRoomData(v, userId));
  }

  async incrementRoomMembersUnSeenMessages(
    roomId: string,
  ): Promise<[string[], Room]> {
    try {
      const res = await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          members: {
            updateMany: {
              where: {
                online: {
                  equals: false,
                },
              },
              data: {
                unSeenNum: {
                  increment: 1,
                },
              },
            },
          },
        },
      });
      return [
        res.members.filter((v) => v.unSeenNum > 0).map((v) => v.userId),
        res,
      ];
    } catch (error) {
      console.log(error);
      return [[], null];
    }
  }

  async setRoomMemberOnline(userId: string, roomId: string): Promise<Boolean> {
    try {
      await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          members: {
            updateMany: {
              where: {
                userId,
              },
              data: {
                online: true,
                unSeenNum: 0,
              },
            },
          },
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async setRoomMemberOffline(userId: string, roomId: string): Promise<Boolean> {
    try {
      await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          members: {
            updateMany: {
              where: {
                userId,
              },
              data: {
                online: false,
              },
            },
          },
        },
      });
      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  async getPrivateRoomByUserId(
    senderId: string,
    reciverId: string,
  ): Promise<ChatRoom | null> {
    const room = await this.prisma.room.findFirst({
      where: {
        roomType: 'private',
        members: {
          every: {
            userId: {
              in: [senderId, reciverId],
            },
          },
        },
      },
    });
    if (!room) return null;
    return this.formatChatRoomData(room);
  }

  async getRoomById(id: string): Promise<ChatRoom> {
    const res = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
    return this.formatChatRoomData(res);
  }

  formatChatRoomData(
    { members, ...rest }: PrismaChatRoom,
    userId?: string,
  ): ChatRoom {
    return {
      ...rest,
      membersUserIds: members.map((v) => v.userId),
      unSeenMessages: userId
        ? members.find((v) => v.userId === userId)?.unSeenNum || 0
        : 0,
    };
  }
}
