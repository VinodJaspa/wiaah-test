import { AdminNewsfeedPost, NewsfeedPost } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';

import {
  GetAdminFilteredNewsfeedPostsInput,
  UpdatePostAdminInput,
} from './dto';
import { GetNewsfeedPostsByUserIdInput } from './dto/get-newsfeed-posts-by-user-id.input';
import { NewsfeedPostsService } from './newsfeed-posts.service';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class NewsfeedPostsAdminResolver {
  constructor(
    private readonly service: NewsfeedPostsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [NewsfeedPost])
  getProfileNewsfeedPosts(
    @Args('getUserNewsfeedPosts') input: GetNewsfeedPostsByUserIdInput,
  ) {
    // TODO: use raw query to get data from newsfeedposts and action collections togather
    return this.service.getNewsfeedPostsByUserId(
      input.userId,
      input.type,
      input.pagination,
    );
  }

  @Query(() => [NewsfeedPost])
  async getFilteredNewsfeedPosts(
    @Args('args') args: GetAdminFilteredNewsfeedPostsInput,
  ) {
    const filters: Prisma.NewsfeedPostWhereInput[] = [];

    if (args.comments) {
      filters.push({
        comments: args.comments,
      });
    }
    if (args.likes) {
      filters.push({
        comments: args.likes,
      });
    }
    if (args.shares) {
      filters.push({
        comments: args.shares,
      });
    }

    if (args.views) {
      filters.push({
        comments: args.views,
      });
    }
    if (args.legend) {
      filters.push({
        legend: {
          contains: args.legend,
        },
      });
    }
    if (args.date) {
      const argsDate = new Date(args.date);
      filters.push({
        createdAt: {
          gte: new Date(
            argsDate.getFullYear(),
            argsDate.getMonth(),
            argsDate.getDate(),
            0,
            0,
            0,
          ),
        },
      });

      filters.push({
        createdAt: {
          lte: new Date(
            argsDate.getFullYear(),
            argsDate.getMonth(),
            argsDate.getDate() + 1,
            0,
            0,
            0,
          ),
        },
      });
    }
    return this.prisma.newsfeedPost.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @Query(() => AdminNewsfeedPost)
  async adminGetNewsfeedPost(@Args('id') id: string) {
    return this.prisma.newsfeedPost.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Boolean)
  async editNewsfeedPostAdmin(@Args('args') args: UpdatePostAdminInput) {
    const { userId, ...rest } = args;
    await this.service.update(rest, userId);

    return true;
  }

  @Mutation(() => Boolean)
  async adminDeleteNewsfeedPost(@Args('id') id: string) {
    await this.prisma.newsfeedPost.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
