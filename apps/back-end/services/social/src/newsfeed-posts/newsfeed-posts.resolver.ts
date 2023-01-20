import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsfeedPostsService } from './newsfeed-posts.service';
import { NewsfeedPost } from '@entities';
import { CreateNewsfeedPostInput, UpdateNewsfeedPostInput } from '@input';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { GetNewsfeedPostsByUserIdInput } from './dto';

@Resolver(() => NewsfeedPost)
@UseGuards(new GqlAuthorizationGuard([]))
export class NewsfeedPostsResolver {
  constructor(private readonly newsfeedPostsService: NewsfeedPostsService) {}

  @Mutation(() => NewsfeedPost)
  createNewsfeedPost(
    @Args('createNewsfeedPostInput')
    createNewsfeedPostInput: CreateNewsfeedPostInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.createNewsfeedPost(
      createNewsfeedPostInput,
      user.id,
    );
  }

  @Query(() => [NewsfeedPost])
  getNewsfeedPostsByUserId(@Args('args') args: GetNewsfeedPostsByUserIdInput) {
    return this.newsfeedPostsService.getNewsfeedPostsByUserId(
      args.userId,
      args.pagination,
    );
  }

  @Mutation(() => NewsfeedPost)
  updateNewsfeedPost(
    @Args('updateNewsfeedPostInput')
    updateNewsfeedPostInput: UpdateNewsfeedPostInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.update(updateNewsfeedPostInput, user.id);
  }

  @Mutation(() => NewsfeedPost)
  removeNewsfeedPost(
    @Args('id', { type: () => Int }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.deleteNewsfeedPost(id, user.id);
  }
}
