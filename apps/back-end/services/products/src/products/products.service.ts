import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import {
  PresentationType,
  Prisma,
  Product as PrismaProduct,
} from '@prisma-client';
import { PrismaService } from 'prismaService';
import {
  ProductSearchPaginationInput,
  IsOwnerOfShopMessage,
  IsOwnerOfShopMessageReply,
  NewProductCreatedEvent,
  GetIsExternalSeller,
  GetIsExternalSellerReply,
} from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
  ExtractPagination,
  UserPreferedLang,
  getTranslatedResource,
} from 'nest-utils';
import {
  ProductNotFoundException,
  ProductNotFoundOrUnaccessable,
} from '@products/exceptions';
import { Product, ProductSearchPaginationResponse } from '@products/entities';
import {
  UpdateProductInput,
  CreateProductInput,
  ReviewProductInput,
} from '@products/dto';
import { FileTypeEnum, UploadService } from '@wiaah/upload';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly uploadService: UploadService,
  ) {}

  private readonly maxRate: number = 5;

  async createNewProduct(
    createProductInput: CreateProductInput,
    user: AuthorizationDecodedUser,
  ) {
    const isExternalSeller = await this.isExternalSeller(user.id);

    if (
      isExternalSeller &&
      typeof createProductInput.external_link !== 'string'
    )
      throw new BadRequestException('external link is required');

    const { shopId } = user;

    const res = await this.uploadService.uploadFiles(
      createProductInput.presentations.map((v) => ({
        file: {
          stream: v.file.createReadStream(),
          meta: {
            mimetype: v.file.mimetype,
            name: v.file.filename,
          },
        },
        options: {
          allowedMimtypes: [
            ...this.uploadService.mimetypes.image.all,
            ...this.uploadService.mimetypes.videos.all,
          ],
          maxSecDuration: 60 * 10 * 1000,
        },
      })),
    );

    const product = await this.prisma.product.create({
      data: {
        ...createProductInput,
        discount: {
          create: createProductInput.discount,
        },
        sellerId: user.id,
        presentations: res.map((v) => {
          const type = this.uploadService.getFileTypeFromMimetype(v.mimetype);

          if (type !== FileTypeEnum.image && type !== FileTypeEnum.video)
            return null;

          return {
            src: v.src,
            type:
              type === FileTypeEnum.image
                ? PresentationType.image
                : PresentationType.video,
          };
        }),
      },
    });

    this.eventClient.emit<string, NewProductCreatedEvent>(
      KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated,
      new NewProductCreatedEvent({ id: product.id, ownerId: user.id, shopId }),
    );

    return product;
  }

  async updateProduct(
    userId: string,
    input: UpdateProductInput,
    lang: UserPreferedLang = 'en',
  ): Promise<Product> {
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
      const res = await this.uploadService.uploadFiles(
        rest.presentations.map((v) => ({
          file: {
            stream: v.file.createReadStream(),
            meta: {
              mimetype: v.file.mimetype,
              name: v.file.filename,
            },
          },
          options: {
            allowedMimtypes: [
              ...this.uploadService.mimetypes.image.all,
              ...this.uploadService.mimetypes.videos.all,
            ],
            maxSecDuration: 60 * 10 * 1000,
          },
        })),
      );

      const prod = await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          presentations: rest.oldPresentations
            .concat(
              res.map((v) => {
                const type = this.uploadService.getFileTypeFromMimetype(
                  v.mimetype,
                );

                if (type !== FileTypeEnum.image && type === FileTypeEnum.video)
                  return null;

                return {
                  src: v.src,
                  type:
                    type === FileTypeEnum.image
                      ? PresentationType.image
                      : PresentationType.video,
                };
              }),
            )
            .filter((v) => !!v),
          discount: {
            update: rest.discount,
          },
        },
      });

      return this.formatProduct(prod, lang);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProduct(
    productId: string,
    userId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Product> {
    const { id } = await this.getProductIfOwner(productId, userId);

    const removed = await this.prisma.product.delete({
      where: {
        id,
      },
    });
    return this.formatProduct(removed, lang);
  }

  async getProductIfOwner(
    productId: string,
    userId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Product> {
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
    return this.formatProduct(product, lang);
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
    if (!success) throw new Error(error.message);
    return data;
  }

  async getProductById(
    productId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Product> {
    const res = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      rejectOnNotFound(error) {
        throw new ProductNotFoundException();
      },
    });

    return this.formatProduct(res, lang);
  }

  getAll() {
    return this.prisma.product.findMany();
  }

  async rateProduct(input: ReviewProductInput, userId: string) {
    const { productId, rate } = input;
    const product = await this.getProtectedProductById(productId, userId);

    console.log({ product }, await this.getAll());

    const newOverallRate =
      ((product.rateStarCount + rate) /
        ((product.reviews + 1) * this.maxRate)) *
      this.maxRate;

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        rate: newOverallRate,
        rateStarCount: {
          increment: rate,
        },
        reviews: {
          increment: 1,
        },
      },
    });
  }

  // TODO: remove on production
  async deleteAll() {
    try {
      await this.prisma.product.deleteMany();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllBySellerId(
    sellerId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Product[]> {
    const res = await this.prisma.product.findMany({
      where: {
        sellerId,
      },
    });

    return res.map((v) => this.formatProduct(v, lang));
  }

  async createPh() {
    try {
      await this.prisma.product.createMany({
        data: [],
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFilteredProducts(
    input: ProductSearchPaginationInput,
    lang: UserPreferedLang = 'en',
  ): Promise<ProductSearchPaginationResponse> {
    try {
      const { skip, take, totalSearched } = ExtractPagination(input.pagination);

      const prismaFilters: Prisma.ProductWhereInput[] = [];
      const { filters } = input;

      if (filters.title) {
        prismaFilters.push({
          title: {
            some: {
              value: {
                contains: filters.title,
              },
            },
          },
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
        filters.rating.forEach((v) => {
          prismaFilters.push({
            rate: {
              gte: v,
              lt: v + 1,
            },
          });
        });
      }

      if (prismaFilters.length < 1)
        return {
          data: [],
          hasMore: false,
          total: 0,
        };

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

      return {
        data: products.map((v) => this.formatProduct(v, lang)),
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

    const isShopOwner = await this.isOwnerOfShop(reviewerId, product.sellerId);

    if (isShopOwner)
      throw new UnauthorizedException('you cant review you own products');

    return true;
  }

  async getPublicProductsByIds(
    ids: string[],
    lang: string = 'en',
  ): Promise<Product[]> {
    const res = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
        visibility: 'public',
      },
    });

    return res.map((v) => this.formatProduct(v, lang));
  }

  async getProtectedProductById(
    id: string,
    userId: string,
    lang: string = 'en',
  ): Promise<Product> {
    const filters = await this.getPremissionFilters(id, userId);
    const res = await this.prisma.product.findFirst({
      where: {
        AND: filters.concat({
          id,
        }),
      },
      rejectOnNotFound() {
        throw new ProductNotFoundOrUnaccessable();
      },
    });

    return this.formatProduct(res, lang);
  }

  formatProduct(prod: PrismaProduct, lang: string): Product {
    return {
      ...prod,
      title: getTranslatedResource({
        langId: lang,
        resource: prod.title,
        fallbackLangId: 'en',
      }),
      description: getTranslatedResource({
        langId: lang,
        resource: prod.description,
        fallbackLangId: 'en',
      }),
    };
  }

  private async getPremissionFilters(
    productId: string,
    userId: string,
  ): Promise<Prisma.ProductWhereInput[]> {
    const filters: Prisma.ProductWhereInput[] = [];

    filters.push({
      visibility: 'public',
    });

    return filters;
  }

  private async isExternalSeller(sellerId: string) {
    const {
      results: { data, success },
    } = await KafkaMessageHandler<
      string,
      GetIsExternalSeller,
      GetIsExternalSellerReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.MEMBERSHIP_MESSAGES.isExternalSeller,
      new GetIsExternalSeller({
        sellerId,
      }),
    );

    if (success) {
      return data.isExternal;
    } else {
      return false;
    }
  }
}
