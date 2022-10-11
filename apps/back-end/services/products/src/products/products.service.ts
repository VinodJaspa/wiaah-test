import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';
import { CreateProdutctInput } from './dto/create-produtct.input';
import {
  ProductSearchPaginationInput,
  IsOwnerOfShopMessage,
  IsOwnerOfShopMessageReply,
  NewProductCreatedEvent,
} from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
  ExtractPagination,
} from 'nest-utils';
import { Product, ProductSearchPaginationResponse } from '@products';
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
    const { shopId } = user;

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
    const { id, ...rest } = input;
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product)
      throw new NotFoundException('no product with the given id was found');

    const isOwner = product.sellerId === userId;

    if (!isOwner)
      throw new UnauthorizedException(
        'you can only update products in your shop',
      );

    try {
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

  async removeProduct(productId: string, userId: string): Promise<Product> {
    const { id } = await this.getProductIfOwner(productId, userId);

    const removed = await this.prisma.product.delete({
      where: {
        id,
      },
    });
    return removed;
  }

  async getProductIfOwner(productId: string, userId: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      rejectOnNotFound() {
        throw new NotFoundException('this product not found');
      },
    });
    if (product.sellerId !== userId)
      throw new UnauthorizedException(
        'you cannot preform this action on products you dont own',
      );
    return product;
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

  getProductById(productId: string): Promise<Product> {
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

  getAllBySellerId(sellerId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        sellerId,
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

  async getFilteredProducts(
    input: ProductSearchPaginationInput,
  ): Promise<ProductSearchPaginationResponse> {
    try {
      const { page, skip, take, totalSearched } = ExtractPagination(
        input.pagination,
      );

      const prismaFilters: Prisma.ProductWhereInput[] = [];
      const { filters } = input;

      if (filters.title) {
        prismaFilters.push({
          title: { contains: filters.title },
        });
      }

      if (filters.brands) {
        prismaFilters.push({
          brand: { in: filters.brands },
        });
      }

      if (filters.price) {
        prismaFilters.push({
          price: { gte: filters.price.min, lte: filters.price.max },
        });
      }
      if (filters.stockStatus) {
        prismaFilters.push({
          stock:
            filters.stockStatus === 'available'
              ? { gt: 0 }
              : filters.stockStatus === 'unavailable'
              ? 0
              : undefined,
        });
      }
      if (filters.rating) {
        prismaFilters.push({
          rate: {
            in: filters.rating,
          },
        });
      }

      const products = await this.prisma.product.findMany({
        where: {
          AND: prismaFilters,
        },
        take,
        skip,
        orderBy: {
          rate: 'asc',
        },
      });

      if (prismaFilters.length < 1)
        return {
          data: [],
          hasMore: false,
          total: 0,
        };

      return {
        data: products,
        total: totalSearched,
        hasMore: products.length >= take,
      };
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
    type: 'goods',
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'cutting board',
    brand: 'nike',
    price: 16,
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    type: 'goods',
    category: 'test',
    description: 'test product description',
    stock: 0,
    shopId: '1234',
    title: 'cup',
    brand: 'or',
    price: 18,
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    type: 'goods',
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'sofa',
    brand: 'zara',
    price: 30,
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    type: 'digital',
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'mouse',
    brand: 'zake',
    price: 5,
    sellerId: 'sellerid',
    thumbnail: '',
  },
  {
    type: 'digital',
    category: 'test',
    description: 'test product description',
    stock: 13,
    shopId: '1234',
    title: 'vase',
    brand: 'dior',
    price: 98,
    sellerId: 'sellerid',
    thumbnail: '',
  },
];
