import { Comment } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AdminGetContentCommentsInput } from './dto';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class CommentsAdminResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Comment])
  async adminGetContentComments(
    @Args('args') args: AdminGetContentCommentsInput,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);

    return this.prisma.comment.findMany({
      where: {
        hostId: args.contentId,
        hostType: args.contentType,
      },
      skip,
      take,
    });
  }
}
