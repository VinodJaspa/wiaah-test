import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  createRadiusCoordsByKm,
  ExtractPagination,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { EventBus } from '@nestjs/cqrs';

import { Shop as ShopEntity } from './entities';
import { CreateShopInput } from './dto/create-shop.input';
import { FilteredShopsInput } from './dto/filter-shops.input';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { ShopCreatedEvent, ShopCreationFailedEvent } from './events';
import { UpdateUserShopInput } from './dto';
import { Shop } from '@prisma-client';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async CreateShop(
    createShopInput: CreateShopInput,
    user: AuthorizationDecodedUser,
  ): Promise<ShopEntity> {
    const userHasShop = await this.hasShop(user.id);

    if (userHasShop)
      throw new UnprocessableEntityException(
        'this account already has an shop, seller account can only have 1 shop',
      );

    try {
      const createdShop = await this.prisma.shop.create({
        data: {
          ...createShopInput,
          ownerId: user.id,
          verified: false,
          geoLocation: {
            coordinates: [
              createShopInput.location.long,
              createShopInput.location.lat,
            ],
          },
        },
      });
      this.eventBus.publish<ShopCreatedEvent>(
        new ShopCreatedEvent(user.id, createdShop),
      );
      return this.formatShopData(createdShop);
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

  async getShopByOwnerId(
    ownerId: string,
    langId: UserPreferedLang,
  ): Promise<ShopEntity> {
    const shop = await this.prisma.shop.findUnique({
      where: {
        ownerId,
      },
    });

    return this.formatShopData(shop, langId);
  }

  async findAll() {
    try {
      const shops = await this.prisma.shop.findMany();

      return shops;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getShopById(id: string, langId: UserPreferedLang): Promise<ShopEntity> {
    const shop = await this.prisma.shop.findUnique({
      where: {
        id,
      },
    });

    return this.formatShopData(shop, langId);
  }

  async removeAllShops(): Promise<boolean> {
    try {
      await this.prisma.shop.deleteMany();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNearShops(
    input: GetNearShopsInput,
    langId: UserPreferedLang,
  ): Promise<ShopEntity[]> {
    const shops = (await this.prisma.shop.aggregateRaw({
      pipeline: [
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [input.lon, input.lat] },
            spherical: true,
            query: { storeType: input.storeType },
            distanceField: 'distance',
          },
        },
        { $limit: input.take },
      ],
    })) as unknown as Shop[];

    return shops.map((v, i) => this.formatShopData(v, langId));
  }

  async updateShopData(
    input: UpdateUserShopInput,
    userId: string,
    langId: UserPreferedLang,
  ): Promise<ShopEntity> {
    try {
      const shop = await this.prisma.shop.update({
        where: {
          ownerId: userId,
        },
        data: input,
      });

      return this.formatShopData(shop, langId);
    } catch (error) {
      throw new BadRequestException('error validating shop authority');
    }
  }

  async getFilteredShops(
    input: FilteredShopsInput,
    langId: UserPreferedLang,
  ): Promise<ShopEntity[]> {
    const searchQueries = [];
    const { skip, take } = ExtractPagination(input.pagination);

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
    if (input.businessType) {
      searchQueries.push({
        vendorType: {
          has: input.businessType,
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

    const shops = await this.prisma.shop.findMany({
      where: {
        AND: searchQueries,
      },
      skip,
      take,
    });

    return shops.map((v) => this.formatShopData(v, langId));
  }

  formatShopData(shop: Shop, langId: string = 'en'): ShopEntity {
    shop.videos;
    return {
      ...shop,
      name: getTranslatedResource({ langId, resource: shop.name }),
      description: getTranslatedResource({
        langId,
        resource: shop.description,
      }),
    };
  }
}
