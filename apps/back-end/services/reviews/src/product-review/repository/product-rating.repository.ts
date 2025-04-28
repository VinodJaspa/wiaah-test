import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'src/Prisma.service';

@Injectable()
export class ProductRatingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(productId: string) {
    return this.prisma.productRating.create({
      data: {
        id: productId,
      },
    });
  }

  async update(productId: string, input: Prisma.ProductRatingUpdateInput) {
    return this.prisma.productRating.update({
      where: {
        id: productId,
      },
      data: input,
    });
  }

  async getByProductId(productId: string) {
    return this.prisma.productRating.findUnique({
      where: {
        id: productId,
      },
    });
  }
}
