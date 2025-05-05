import { Injectable } from '@nestjs/common';
import { CreateProductReviewInput } from '@product-review/dto';
import { ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { PrismaService } from 'src/Prisma.service';

@Injectable()
export class ProductReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    input: CreateProductReviewInput & { sellerId: string },
    userId: string,
  ) {
    return this.prisma.productReview.create({
      data: {
        sellerId: input.sellerId,
        message: input.message,
        productId: input.productId,
        reviewerId: userId,
        rate: input.rate,
      },
    });
  }

  async delete(reviewId: string) {
    return this.prisma.productReview.delete({
      where: {
        id: reviewId,
      },
    });
  }

  async getOneById(id: string) {
    return this.prisma.productReview.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllBySellerId(sellerId: string, pagination: GqlPaginationInput) {
    const { skip, take } = ExtractPagination(pagination);

    return this.prisma.productReview.findMany({
      where: {
        sellerId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip,
      take,
    });
  }

  async getAllByProductId(productId: string, pagination: GqlPaginationInput) {
    const { skip, take } = ExtractPagination(pagination);
    return this.prisma.productReview.findMany({
      where: {
        productId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip,
      take,
    });
  }

  async getOneByProductAndReviewerIds(productId: string, userId: string) {
    return this.prisma.productReview.findUnique({
      where: {
        productId_reviewerId: {
          productId,
          reviewerId: userId,
        },
      },
    });
  }
}
