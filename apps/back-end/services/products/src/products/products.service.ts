import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma-client';
import { PrismaService } from 'src/Prisma.service';
import { CreateProdutctInput } from './dto/create-produtct.input';
import {
  SearchInput,
  CreatWisherListPayload,
  IsOwnerOfShopMessage,
  IsOwnerOfShopMessageReply,
  NewProductCreatedEvent,
  GetUserShopMetaDataMessage,
  GetUserShopMetaDataMessageReply,
} from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateProdutctInput } from './dto/update-produtct.input';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async createNewProduct(
    createProductInput: CreateProdutctInput,
    user: AuthorizationDecodedUser,
  ) {
    const {
      results: { success, data, error },
    } = await KafkaMessageHandler<
      string,
      GetUserShopMetaDataMessage,
      GetUserShopMetaDataMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.getUserShopId,
      new GetUserShopMetaDataMessage({ accountId: user.id }),
    );

    if (!success) {
      throw new Error(error);
    }

    const { shopId } = data;

    const product = await this.prisma.product.create({
      data: {
        ...createProductInput,
        shopId,
        sellerId: user.id,
      },
    });

    this.eventClient.emit<string, NewProductCreatedEvent>(
      KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated,
      new NewProductCreatedEvent({ id: product.id, ownerId: user.id, shopId }),
    );

    return product;
  }

  async updateProduct(userId: string, input: UpdateProdutctInput) {
    try {
      const { id, ...rest } = input;
      const product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!product)
        throw new BadRequestException('no product with the given id was found');

      const isOwner = await this.isOwnerOfShop(userId, id);

      if (!isOwner)
        throw new UnauthorizedException(
          'you can only update products in your shop',
        );

      await this.prisma.product.update({
        where: {
          id,
        },
        data: rest,
      });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async isOwnerOfShop(userId: string, shopId: string): Promise<boolean> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      IsOwnerOfShopMessage,
      IsOwnerOfShopMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.isOwnerOfShop,
      new IsOwnerOfShopMessage({ ownerId: userId, shopId }),
      'shop validation timed out',
    );
    if (!success) throw new Error(error);
    return data;
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
        shopId,
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

  async isProductReviewable(productId: string, reviewerId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new NotFoundException('product not found');
    if (product.visibility !== 'public')
      throw new UnauthorizedException('this product is private');

    const isShopOwner = await this.isOwnerOfShop(reviewerId, product.shopId);
    console.log('isshopowner', isShopOwner);

    if (isShopOwner)
      throw new UnauthorizedException('you cant review you own products');

    return true;
  }

  async getPublicProductsByIds(ids: string[]): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
        visibility: 'public',
      },
    });
  }
}

const ProductsPh: Prisma.ProductCreateInput[] = [
  {
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'cutting board',
    brand: 'nike',
    price: 16,
    colors: ['red', 'blue'],
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    category: 'test',
    description: 'test product description',
    stock: 0,
    shopId: '1234',
    title: 'cup',
    brand: 'or',
    price: 18,
    colors: ['yellow', 'green'],
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'sofa',
    brand: 'zara',
    price: 30,
    colors: ['red', 'gray', 'white'],
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'mouse',
    brand: 'zake',
    price: 5,
    colors: ['purple', 'lime', 'yellow'],
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'vase',
    brand: 'dior',
    price: 98,
    colors: ['cyan', 'lime', 'black', 'crimson'],
    sellerId: 'sellerid',
    thumbnail: '',
  },
];
