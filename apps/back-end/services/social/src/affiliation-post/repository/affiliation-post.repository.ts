import { Injectable } from '@nestjs/common';
import { ExtractPagination, GqlPaginationInput } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateAffiliationPostInput } from '../dto/create-affiliation-post.input';

@Injectable()
export class AffiliationPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateAffiliationPostInput, userId: string) {
    return this.prisma.affiliationPost.create({
      data: {
        ...input,
        userId,
      },
    });
  }

  getAllByAuthorId(authorId: string, pagination: GqlPaginationInput) {
    const { skip, take } = ExtractPagination(pagination);

    return this.prisma.affiliationPost.findMany({
      where: {
        userId: authorId,
      },
      skip,
      take,
    });
  }
}
