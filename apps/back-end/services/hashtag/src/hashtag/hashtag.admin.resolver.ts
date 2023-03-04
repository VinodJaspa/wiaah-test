import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma-client';
import { ExtractPagination } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetFilteredHashtagsInput } from './dto';
import { Hashtag } from './entities';

@Resolver()
export class HashtagAdminResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Hashtag])
  adminGetHashtag(@Args('args') args: GetFilteredHashtagsInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    let filters: Prisma.HashtagWhereInput[] = [];

    if (args.tag) {
      filters.push({
        tag: {
          contains: args.tag,
        },
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }

    if (args.usage) {
      filters.push({
        usage: args.usage,
      });
    }

    return this.prisma.hashtag.findMany({
      where: {
        AND: filters,
      },
    });
  }
}
