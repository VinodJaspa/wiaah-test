import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Shop, Prisma } from '@prisma-client';
import {
  AuthorizationDecodedUser,
  createNewCoords,
  getCoordinatesAfterDistance,
  getDistanceFromLatLonInKm,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { CreateShopInput } from './dto/create-shop.input';
import { FilterShopsInput } from './dto/filter-shops.input';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { IsSellerAccountEvent } from './events/isSellerAccount.event';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly accountsService: ClientKafka,
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

    return await new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        rej('internal server error: Timeout');
      }, 3000);

      this.accountsService
        .send(KAFKA_MESSAGES.isSellerAccount, new IsSellerAccountEvent(user.id))
        .subscribe(async (data) => {
          if (data !== 'true') {
            rej(
              'only seller accounts can open a shop, register for a seller account to stat Selling!',
            );
            return;
          }

          const createdShop = await this.prisma.shop.create({
            data: { ...createShopInput, ownerId: user.id },
          });

          res(createdShop);
          clearTimeout(timeout);
        });
    });
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

  async createPlaceholderShops() {
    try {
      await this.prisma.shop.createMany({
        data: shopsPh,
      });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  getShopById(id: string) {
    return this.prisma.shop.findFirst();
    this.prisma.shop.findUnique({
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

  async getNearShops(input: GetNearShopsInput) {
    const { lat: lat1, lon: lon1 } = createNewCoords(
      input.lat,
      input.lon,
      input.distance,
    );
    const { lat: lat2, lon: lon2 } = createNewCoords(
      input.lat,
      input.lon,
      -input.distance,
    );

    const shops = await this.prisma.shop.findMany({
      where: {
        location: {
          is: {
            AND: [
              {
                long: {
                  lte: lon1,
                  gte: lon2,
                },
              },
              {
                lat: {
                  lte: lat1,
                  gte: lat2,
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

    console.log('queries', searchQueries);
    const shops = this.prisma.shop.findMany({
      where: {
        AND: searchQueries,
      },
    });
    return shops;
  }
}

const shopsPh: Prisma.ShopCreateInput[] = [
  {
    name: 'test',
    ownerId: 'id',
    storeType: ['type1', 'type2'],
    targetGenders: ['male'],
    vendorType: ['vendor3'],
    location: {
      lat: 32.00063711672341,
      long: 20.000751274280667,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    ownerId: 'id',
    storeType: ['type3'],
    targetGenders: ['female'],
    vendorType: ['vendor1'],
    location: {
      lat: 55,
      long: 53,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    ownerId: 'id',
    storeType: ['type2'],
    targetGenders: ['male', 'female'],
    vendorType: ['vendor2'],
    location: {
      lat: 90,
      long: 93,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    ownerId: 'id',
    storeType: ['type1', 'type2'],
    targetGenders: ['male'],
    vendorType: ['vendor3'],
    location: {
      lat: 64,
      long: 65,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    ownerId: 'id',
    storeType: ['type1', 'type2'],
    targetGenders: ['male'],
    vendorType: ['vendor3'],
    location: {
      lat: 5,
      long: 7,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
];
