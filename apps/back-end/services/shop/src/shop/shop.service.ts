import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Shop, Prisma } from '@prisma-client';
import {
  AuthorizationDecodedUser,
  getCoordinatesAfterDistance,
  getDistanceFromLatLonInKm,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { CreateShopInput } from './dto/create-shop.input';
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
          console.log('new data', data);
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

  findAll() {
    try {
      return this.prisma.shop.findMany();
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

  async getNearShops(input: GetNearShopsInput) {
    const [lat1] = getCoordinatesAfterDistance(
      [input.lat, input.lon],
      270,
      input.distance,
    );
    const [lat2] = getCoordinatesAfterDistance(
      [input.lat, input.lon],
      90,
      input.distance,
    );
    const [_, lon1] = getCoordinatesAfterDistance(
      [input.lat, input.lon],
      0,
      input.distance,
    );
    const [__, lon2] = getCoordinatesAfterDistance(
      [input.lat, input.lon],
      180,
      input.distance,
    );

    console.log('new cords', lat1, lat2, lon1, lon2);
    const shops = await this.prisma.shop.findMany({
      where: {
        location: {
          is: {
            // lat: {
            //   in: [lat1, lat2],
            // },
            long: {
              in: [lon1, lon2],
            },
          },
        },
      },
    });
    return shops;
  }
}

const shopsPh: Prisma.ShopCreateInput[] = [
  {
    name: 'test',
    ownerId: 'id',
    location: { lat: 30, long: 20, address: 'address' },
  },
  {
    name: 'test',
    ownerId: 'id',
    location: { lat: 55, long: 53, address: 'address' },
  },
  {
    name: 'test',
    ownerId: 'id',
    location: { lat: 90, long: 93, address: 'address' },
  },
  {
    name: 'test',
    ownerId: 'id',
    location: { lat: 64, long: 65, address: 'address' },
  },
  {
    name: 'test',
    ownerId: 'id',
    location: { lat: 5, long: 7, address: 'address' },
  },
];
