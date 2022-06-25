import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WisherslistService } from 'src/wisherslist/wisherslist.service';
import { AddWishlistItemInput } from './dto/add-wishlist-item.input';
import { RemoveWishlistItemInput } from './dto/remove-wishlist-item.input';

@Injectable()
export class WishlistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wishersService: WisherslistService,
  ) {}

  createWishlist(ownerId: string) {
    return this.prisma.wishlist.create({
      data: {
        ownerId,
        wishedItems: [],
      },
    });
  }

  async getWishlist(ownerId: string) {
    try {
      const wishlist = await this.prisma.wishlist.findUnique({
        where: {
          ownerId,
        },
      });
      if (wishlist === null)
        throw new Error('this account doesnt have a wishlist');
      return wishlist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addWishlistItem(ownerId: string, { itemId }: AddWishlistItemInput) {
    try {
      await this.prisma.wishlist.update({
        where: {
          ownerId,
        },
        data: {
          wishedItems: {
            push: {
              itemId,
            },
          },
        },
      });
      await this.wishersService.addWisherListItem(itemId, ownerId);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeWishlistItem(
    ownerId: string,
    { itemId }: RemoveWishlistItemInput,
  ) {
    try {
      await this.prisma.wishlist.update({
        where: {
          ownerId,
        },
        data: {
          wishedItems: {
            deleteMany: {
              where: {
                itemId,
              },
            },
          },
        },
      });
      await this.wishersService.removeWisherListItem(itemId, ownerId);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
