import { Injectable } from '@nestjs/common';
import { ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { BlockedUser, Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class BlockRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByBlockerId(
    blockerId: string,
    pagination: GqlPaginationInput,
  ): Promise<BlockedUser[]> {
    const { take, skip } = ExtractPagination(pagination);
    const block = await this.prisma.blockedUser.findMany({
      where: {
        blockerUserId: blockerId,
      },
      include: {
        blockedProfile: true,
      },
      take,
      skip,
    });

    return;
  }

  getBlockObj(blockerId: string, blockedId: string) {
    return this.prisma.blockedUser.findUnique({
      where: {
        blockedProfileRel: {
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
          blockedProfileRel: {
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
