import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { Product } from '@products/entities';
import { PrismaService } from 'prismaService';
import { PresentationType, Prisma } from '@prisma-client';
import { QueryBus } from '@nestjs/cqrs';

import {
  AdminGetAccountProductsInput,
  GetFilteredProductsAdminInput,
  UpdateProductInput,
} from './dto';
import { GetSellersIdsByNameQuery } from './queries';
import { FileTypeEnum, UploadService } from '@wiaah/upload';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ProductsAdminResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
    private readonly uploadService: UploadService,
  ) {}

  @Query(() => [Product])
  async getAdminFilteredProducts(
    @Args('args') args: GetFilteredProductsAdminInput,
  ) {
    const filters: Prisma.ProductWhereInput[] = [];

    if (args.title) {
      filters.push({
        title: {
          some: {
            value: {
              contains: args.title,
            },
          },
        },
      });
    }

    if (args.price) {
      filters.push({
        price: args.price,
      });
    }

    if (args.qty) {
      filters.push({
        stock: args.qty,
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.productId) {
      filters.push({
        id: {
          contains: args.productId,
        },
      });
    }
    if (args.updatedAt) {
      filters.push({
        updatedAt: {
          gte: args.updatedAt,
        },
      });
    }
    if (args.seller) {
      const ids = await this.querybus.execute(
        new GetSellersIdsByNameQuery(args.seller, args.pagination),
      );
      filters.push({
        sellerId: {
          in: [ids],
        },
      });
    }

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }

    if (args.condition) {
      filters.push({
        condition: args.condition,
      });
    }

    return this.prisma.product.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @Mutation(() => Boolean)
  // async updateProductAdmin(@Args('args') args: UpdateProductInput) {
  //   const { id, ...rest } = args;
  //   const res = await this.uploadService.uploadFiles(
  //     rest.presentations.map((v) => ({
  //       file: {
  //         stream: v.file.createReadStream(),
  //         meta: {
  //           mimetype: v.file.mimetype,
  //           name: v.file.filename,
  //         },
  //       },
  //       options: {
  //         allowedMimtypes: [
  //           ...this.uploadService.mimetypes.image.all,
  //           ...this.uploadService.mimetypes.videos.all,
  //         ],
  //         maxSecDuration: 60 * 10 * 1000,
  //       },
  //     })),
  //   );

  //   const prod = await this.prisma.product.update({
  //     where: {
  //       id,
  //     },
  //     // @ts-ignore
  //     data: {
  //       ...rest,
  //       presentations: rest.oldPresentations
  //         .concat(
  //           res.map((v) => {
  //             const type = this.uploadService.getFileTypeFromMimetype(
  //               v.mimetype,
  //             );

  //             if (type !== FileTypeEnum.image && type === FileTypeEnum.video)
  //               return null;

  //             return {
  //               src: v.src,
  //               type:
  //                 type === FileTypeEnum.image
  //                   ? PresentationType.image
  //                   : PresentationType.video,
  //             };
  //           }),
  //         )
  //         .filter((v) => !!v) as unknown as any[],
  //       discount: rest.discount
  //         ? {
  //             update: rest.discount,
  //           }
  //         : undefined,
  //     },
  //   });
  //   return true;
  // }
  async updateProductAdmin(@Args('args') args: UpdateProductInput) {
    const { id, ...rest } = args;
  
    const prod = await this.prisma.product.update({
      where: {
        id,
      },
      // @ts-ignore
      data: {
        ...rest,
        // Use presentations directly from input (no upload)
        // presentations: rest.presentations,
        discount: rest.discount
          ? {
              update: rest.discount,
            }
          : undefined,
      },
    });
  
    return true;
  }
  

  @Query(() => [Product])
  async adminGetAccountProducts(
    @Args('args') args: AdminGetAccountProductsInput,
  ) {
    const { skip, take } = ExtractPagination(args.pagination);

    const filters: Prisma.ProductWhereInput[] = [];

    if (args.title) {
      filters.push({
        title: {
          some: {
            value: {
              contains: args.title,
            },
          },
        },
      });
    }

    if (args.price) {
      filters.push({
        price: args.price,
      });
    }

    if (args.qty) {
      filters.push({
        stock: args.qty,
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.productId) {
      filters.push({
        id: {
          contains: args.productId,
        },
      });
    }
    if (args.updatedAt) {
      filters.push({
        updatedAt: {
          gte: args.updatedAt,
        },
      });
    }
    if (args.seller) {
      const ids = await this.querybus.execute(
        new GetSellersIdsByNameQuery(args.seller, args.pagination),
      );
      filters.push({
        sellerId: {
          in: [ids],
        },
      });
    }

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }

    if (args.condition) {
      filters.push({
        condition: args.condition,
      });
    }

    return this.prisma.product.findMany({
      where: {
        AND: [
          {
            sellerId: args.accountId,
          },
          ...filters,
        ],
      },
      skip,
      take,
    });
  }

  @Query(() => Product, { nullable: true })
  async adminGetProduct(@Args('id') id: string) {
    const res = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    return res;
  }

  @Mutation(() => Boolean)
  async adminDeleteProduct(
    @Args('id') id: string,
    @Args('reason') reason: string,
  ) {
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        status: 'suspended',
        suspensionReason: reason,
      },
    });
    return true;
  }
}
