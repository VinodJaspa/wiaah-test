import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WisherslistService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.wishersList.findMany();
  }

  async createWisherList(itemId: string) {
    try {
      await this.prisma.wishersList.create({
        data: {
          itemId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addWisherListItem(itemId: string, wisherId: string) {
    try {
      await this.prisma.wishersList.update({
        where: {
          itemId,
        },
        data: {
          wishers: {
            push: {
              wisherId,
            },
          },
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  removeWisherListItem(itemId: string, wisherId: string) {
    try {
      return this.prisma.wishersList.update({
        where: {
          itemId,
        },
        data: {
          wishers: {
            deleteMany: {
              where: {
                wisherId,
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
