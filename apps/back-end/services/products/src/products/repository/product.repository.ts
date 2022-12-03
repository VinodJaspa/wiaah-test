import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, input: Prisma.ProductUpdateInput) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: input,
    });
  }

  async findAllBySellerId(sellerId: string) {
    return this.prisma.product.findMany({
      where: {
        sellerId,
      },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async getProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }
}
