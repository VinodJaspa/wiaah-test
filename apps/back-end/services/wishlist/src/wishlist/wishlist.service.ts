import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DBErrorException } from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  AddWishlistItemInput,
  RemoveWishlistItemInput,
  Wishlist,
} from '@wishlist';
import { WisherslistService } from '@wishersList';

@Injectable()
export class WishlistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wishersService: WisherslistService,
  ) {}

  async createWishlist(ownerId: string): Promise<Wishlist> {
    try {
      await this.getWishlist(ownerId);
      throw new UnprocessableEntityException(
        'this account already owns a wishlist',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        const createdWishlist = await this.prisma.wishlist.create({
          data: {
            ownerId,
            wishedItems: [],
          },
        });
        return createdWishlist;
      } else {
        throw error;
      }
    }
  }

  getAll() {
    return this.prisma.wishlist.findMany();
  }

  async getWishlist(ownerId: string) {
    try {
      const wishlist = await this.prisma.wishlist.findUnique({
        where: {
          ownerId,
        },
        rejectOnNotFound() {
          throw new NotFoundException('this account doesnt have a wishlist');
        },
      });
      return wishlist;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new DBErrorException('error creating wishlish');
    }
  }

  async addWishlistItem(
    userId: string,
    { itemId, sellerId, itemType }: AddWishlistItemInput,
  ) {
    try {
      await this.prisma.wishlist.upsert({
        where: {
          ownerId: userId,
        },
        create: {
          ownerId: userId,
          wishedItems: [{ itemId, itemType }],
          wishedItemsCount: 1,
        },
        update: {
          wishedItems: {
            push: {
              itemId,
              itemType,
            },
          },
          wishedItemsCount: {
            increment: 1,
          },
        },
      });
      await this.wishersService.addWisherListItem(itemId, sellerId, userId);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeWishlistItem(
    ownerId: string,
    { itemId }: RemoveWishlistItemInput,
  ) {
    const wishlist = await this.getWishlist(ownerId);
    const filterdItems = wishlist.wishedItems.filter(
      (v) => v.itemId !== itemId,
    );

    const didRemove = filterdItems.length === wishlist.wishedItems.length - 1;

    if (!didRemove) return false;

    try {
      await this.prisma.wishlist.update({
        where: {
          ownerId: wishlist.ownerId,
        },
        data: {
          wishedItems: filterdItems,
          wishedItemsCount: {
            decrement: 1,
          },
        },
      });
      await this.wishersService.removeWisherListItem(itemId, ownerId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
