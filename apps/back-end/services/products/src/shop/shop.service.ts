import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthorizationDecodedUser, createRadiusCoordsByKm } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { EventBus } from '@nestjs/cqrs';

import { Shop } from './entities';
import { CreateShopInput } from './dto/create-shop.input';
import { FilterShopsInput } from './dto/filter-shops.input';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { ShopCreatedEvent, ShopCreationFailedEvent } from './events';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async CreateShop(
    createShopInput: CreateShopInput,
    user: AuthorizationDecodedUser,
  ): Promise<Shop> {
    const userHasShop = await this.hasShop(user.id);

    if (userHasShop)
      throw new UnprocessableEntityException(
        'this account already has an shop, seller account can only have 1 shop',
      );

    try {
      const createdShop = await this.prisma.shop.create({
        data: { ...createShopInput, ownerId: user.id, verified: false },
      });
      this.eventBus.publish<ShopCreatedEvent>(
        new ShopCreatedEvent(user.id, createdShop),
      );
      return createdShop;
    } catch (error) {
      this.eventBus.publish<ShopCreationFailedEvent>(
        new ShopCreationFailedEvent(error),
      );
      throw new Error(error);
    }
  }

  async hasShop(userId: string): Promise<boolean> {
    const shop = await this.prisma.shop.findFirst({
      where: {
        ownerId: userId,
      },
    });

    return !!shop;
  }

  async getShopByOwnerId(ownerId: string): Promise<Shop> {
    return this.prisma.shop.findUnique({
      where: {
        ownerId,
      },
    });
  }

  async findAll() {
    try {
      const shops = await this.prisma.shop.findMany();

      return shops;
    } catch (error) {
      throw new Error(error);
    }
  }

  getShopById(id: string) {
    return this.prisma.shop.findUnique({
      where: {
        id,
      },
    });
  }

  async removeAllShops(): Promise<boolean> {
    try {
      await this.prisma.shop.deleteMany();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNearShops(input: GetNearShopsInput): Promise<Shop[]> {
    const { maxLat, maxLon, minLat, minLon } = await createRadiusCoordsByKm({
      lat: input.lat,
      lon: input.lon,
      distanceInKm: input.distance,
    });

    const shops = await this.prisma.shop.findMany({
      where: {
        location: {
          is: {
            AND: [
              {
                long: {
                  lte: maxLon,
                  gte: minLon,
                },
              },
              {
                lat: {
                  lte: maxLat,
                  gte: minLat,
                },
              },
            ],
          },
        },
      },
    });
    return shops;
  }

  async getFilteredShops(input: FilterShopsInput): Promise<Shop[]> {
    const searchQueries = [];

    if (input.storeType) {
      searchQueries.push({
        storeType: {
          has: input.storeType,
        },
      });
    }
    if (input.targetGender) {
      searchQueries.push({
        targetGenders: {
          has: input.targetGender,
        },
      });
    }
    if (input.vendorType) {
      searchQueries.push({
        vendorType: {
          has: input.vendorType,
        },
      });
    }
    if (input.country) {
      searchQueries.push({
        location: {
          is: {
            country: input.country,
          },
        },
      });
    }
    if (input.city) {
      searchQueries.push({
        location: {
          is: {
            city: input.city,
          },
        },
      });
    }

    const shops = this.prisma.shop.findMany({
      where: {
        AND: searchQueries,
      },
    });
    return shops;
  }
}
