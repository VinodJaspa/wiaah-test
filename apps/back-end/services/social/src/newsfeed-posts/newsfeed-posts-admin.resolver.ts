import { NewsfeedPost } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { GetNewsfeedPostsByUserIdInput } from './dto/get-newsfeed-posts-by-user-id.input';
import { NewsfeedPostsService } from './newsfeed-posts.service';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class NewsfeedPostsAdminResolver {
  constructor(private readonly service: NewsfeedPostsService) {}

  @Query(() => [NewsfeedPost])
  getProfileNewsfeedPosts(
    @Args('getUserNewsfeedPosts') input: GetNewsfeedPostsByUserIdInput,
  ) {
    return this.service.getProtectedNewsfeedPostById(
      input.userId,
      input.pagination,
    );
  }
}
