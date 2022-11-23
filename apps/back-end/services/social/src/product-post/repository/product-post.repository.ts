import { Injectable } from '@nestjs/common';
import { CreateProductPostInput } from '@product-post/dto';
import { ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Injectable()
export class ProductPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByAuthorId(authorId: string, pagination: GqlPaginationInput) {
    const { skip, take } = ExtractPagination(pagination);

    return this.prisma.productPost.findMany({
      where: {
        userId: authorId,
      },
      take,
      skip,
    });
  }

  async create(input: CreateProductPostInput, userId: string) {
    return this.prisma.productPost.create({
      data: {
        ...input,
        userId,
      },
    });
  }
}
