import { Injectable } from '@nestjs/common';
import { Discount, Prisma, Product as PrismaProduct } from '@prisma-client';
import { Product } from '@products/entities';
import { getTranslatedResource, UserPreferedLang } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTopDiscountedBySellerId(
    sellerId: string,
    lang: UserPreferedLang = 'en',
  ) {
    const res = await this.prisma.product.findFirst({
      where: {
        AND: [
          {
            sellerId,
          },
          {
            discount: {
              is: {
                units: {
                  gt: 1,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        discount: {
          amount: 'desc',
        },
      },
      include: {
        discount: true,
      },
      take: 1,
    });

    return this.formatProduct(res, lang);
  }

  async update(
    id: string,
    input: Prisma.ProductUpdateInput,
    lang: UserPreferedLang = 'en',
  ) {
    const res = await this.prisma.product.update({
      where: {
        id,
      },
      data: input,
    });
    return this.formatProduct(res, lang);
  }

  async findAllBySellerId(sellerId: string) {
    return this.prisma.product.findMany({
      where: {
        sellerId,
      },
    });
  }

  async deleteProduct(id: string, lang: UserPreferedLang = 'en') {
    const res = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return this.formatProduct(res, lang);
  }

  async getProduct(id: string, lang: UserPreferedLang = 'en') {
    const res = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    return this.formatProduct(res, lang);
  }

  formatProduct<T = {}, P = {}>(
    prod: PrismaProduct & T,
    lang: string,
  ): Product & T {
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
      selectableAttributes: prod.attributesIds,
    };
  }
}
