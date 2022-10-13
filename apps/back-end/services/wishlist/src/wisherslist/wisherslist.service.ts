import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WishersList } from '@prisma-client';
import { PrismaService } from 'prismaService';
import { GetItemWishersListInput } from './dto';
import { Wisherslist } from './entities';

@Injectable()
export class WisherslistService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.wishersList.findMany();
  }

  async createWisherList(itemId: string, sellerId: string) {
    const list = await this.prisma.wishersList.findUnique({
      where: {
        itemId,
      },
    });

    if (list)
      throw new UnprocessableEntityException(
        'a list with the this item id is already created',
      );

    try {
      await this.prisma.wishersList.create({
        data: {
          itemId,
          sellerId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addWisherListItem(itemId: string, sellerId: string, userId: string) {
    try {
      await this.prisma.wishersList.upsert({
        where: {
          itemId,
        },
        create: {
          itemId,
          sellerId,
          wishers: [{ userId }],
          wishersCount: 1,
        },
        update: {
          wishers: {
            push: {
              userId,
            },
          },
          wishersCount: {
            increment: 1,
          },
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeWisherListItem(
    itemId: string,
    userId: string,
  ): Promise<WishersList> {
    const { wishers } = await this.getWishersListByItemId(itemId);
    const filtered = wishers.filter((v) => v.userId !== userId);
    const didRemove = filtered.length === wishers.length - 1;

    if (!didRemove) throw new UnprocessableEntityException();

    try {
      return this.prisma.wishersList.update({
        where: {
          itemId,
        },
        data: {
          wishers: filtered,
          wishersCount: {
            decrement: 1,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getItemWishersList(
    input: GetItemWishersListInput,
    userId: string,
  ): Promise<Wisherslist> {
    const list = await this.prisma.wishersList.findUnique({
      where: {
        itemId: input.itemId,
      },
    });

    if (list.sellerId !== userId)
      throw new UnauthorizedException("you cannot see this items's wishers");
    return list;
  }

  async getItemsWishersListsBySellerId(userId: string): Promise<Wisherslist[]> {
    return this.prisma.wishersList.findMany({
      where: {
        sellerId: userId,
      },
    });
  }

  private async getWishersListByItemId(itemId: string) {
    return this.prisma.wishersList.findUnique({
      where: {
        itemId,
      },
      rejectOnNotFound(error) {
        throw new NotFoundException('no wishers list for this item was found');
      },
    });
  }
}
