import { NewsfeedPost } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
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
      input.pagination,
    );
  }

  @Query(() => [NewsfeedPost])
  async getFilteredNewsfeedPosts(
    @Args('args') args: GetAdminFilteredNewsfeedPostsInput,
  ) {
    return this.prisma.newsfeedPost.findMany({});
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
