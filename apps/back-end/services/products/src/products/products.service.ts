import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma-client';
import { PrismaService } from 'src/Prisma.service';
import { CreateProdutctInput } from './dto/create-produtct.input';
import {
  SearchInput,
  CreatWisherListPayload,
  GetUserShopDataEvent,
} from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.WISHLIST_SERVICE.token)
    private readonly wishlistClient: ClientKafka,
    @Inject(SERVICES.SHOP_SERVICE.token)
    private readonly shopclient: ClientKafka,
  ) {}

  async createNewProduct(
    createProductInput: CreateProdutctInput,
    user: AuthorizationDecodedUser,
  ) {
    const userShop: string = await new Promise((res, rej) => {
      console.log('sent');
      this.shopclient
        .send<string, GetUserShopDataEvent>(KAFKA_MESSAGES.getUserStoreData, {
          ownerId: user.id,
        })
        .subscribe((shopId: string) => {
          console.log('shop response', shopId, typeof shopId);
          if (typeof shopId === 'string') {
            res(shopId);
          } else {
            rej(new InternalServerErrorException());
          }
        });
    });
    const product = await this.prisma.product.create({
      data: {
        ...createProductInput,
        rate: 0,
        storeId: '132',
        presentations: [],
        brand: 'brand',
        price: 34,
      },
    });
    this.wishlistClient.emit<string, CreatWisherListPayload>(
      KAFKA_EVENTS.createWishersList,
      { itemId: product.id },
    );
    return product;
  }

  getProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  getAll() {
    return this.prisma.product.findMany();
  }

  async deleteAll() {
    try {
      await this.prisma.product.deleteMany();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  getAllByShopId(shopId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId: shopId,
      },
    });
  }

  async createPh() {
    try {
      await this.prisma.product.createMany({
        data: ProductsPh,
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFilteredProducts(filters: SearchInput[]) {
    try {
      const prismaFilters: Prisma.ProductWhereInput[] = [];

      filters.map(
        (
          {
            brands,
            categories,
            cities,
            colors,
            countries,
            price,
            rating,
            shippingMotheds,
            size,
            stockStatus,
            title,
          },
          i,
        ) => {
          if (title) {
            prismaFilters.push({
              title: { contains: title },
            });
          }

          if (brands) {
            prismaFilters.push({
              brand: { in: brands },
            });
          }

          if (categories) {
            prismaFilters.push({
              category: {
                in: categories,
              },
            });
          }

          if (colors) {
            prismaFilters.push({
              colors: { hasSome: colors },
            });
          }

          if (price) {
            prismaFilters.push({
              price: { gte: price.min, lte: price.max },
            });
          }
          if (size) {
            prismaFilters.push({
              sizes: { hasSome: size },
            });
          }
          if (stockStatus) {
            prismaFilters.push({
              stock:
                stockStatus === 'available'
                  ? { gt: 0 }
                  : stockStatus === 'unavailable'
                  ? 0
                  : undefined,
            });
          }
          if (rating) {
            prismaFilters.push({
              rate: {
                in: rating,
              },
            });
          }
        },
      );

      if (prismaFilters.length < 1) return [];

      return this.prisma.product.findMany({
        where: {
          AND: prismaFilters,
        },
        take: 10,
      });
    } catch (error) {}
  }
}

const ProductsPh: Prisma.ProductCreateInput[] = [
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'cutting board',
    brand: 'nike',
    price: 16,
    colors: ['red', 'blue'],
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 0,
    storeId: '1234',
    title: 'cup',
    brand: 'or',
    price: 18,
    colors: ['yellow', 'green'],
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'sofa',
    brand: 'zara',
    price: 30,
    colors: ['red', 'gray', 'white'],
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'mouse',
    brand: 'zake',
    price: 5,
    colors: ['purple', 'lime', 'yellow'],
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'vase',
    brand: 'dior',
    price: 98,
    colors: ['cyan', 'lime', 'black', 'crimson'],
  },
];
