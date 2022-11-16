import { Injectable } from '@nestjs/common';
import { BlockedUser, Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class BlockRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllByBlockerId(blockerId: string): Promise<BlockedUser[]> {
    return this.prisma.blockedUser.findMany({
      where: {
        blockerUserId: blockerId,
      },
    });
  }

  getBlockObj(blockerId: string, blockedId: string) {
    return this.prisma.blockedUser.findUnique({
      where: {
        blockedProfile: {
          blockedUserId: blockedId,
          blockerUserId: blockerId,
        },
      },
    });
  }

  async create(
    blockerId: string,
    blockedId: string,
  ): Promise<BlockedUser | null> {
    try {
      const res = await this.prisma.blockedUser.create({
        data: {
          blockerUserId: blockerId,
          blockedUserId: blockedId,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }

  async removeBlock(
    blockedUserId: string,
    blockerId: string,
  ): Promise<BlockedUser | null> {
    try {
      const res = await this.prisma.blockedUser.delete({
        where: {
          blockedProfile: {
            blockedUserId,
            blockerUserId: blockerId,
          },
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
}
