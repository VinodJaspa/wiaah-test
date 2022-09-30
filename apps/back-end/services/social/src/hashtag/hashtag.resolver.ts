import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HashtagService } from './hashtag.service';
import { NewsfeedHashtagSearch } from '@entities';
import { GetHashtagNewsfeedPostsInput } from '@input';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

@Resolver()
export class HashtagResolver {
  constructor(private readonly hashtagService: HashtagService) {}

  @Query(() => NewsfeedHashtagSearch)
  getNewsfeedHashtagPosts(
    @Args('hashtagSearchInput') input: GetHashtagNewsfeedPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<NewsfeedHashtagSearch> {
    return this.hashtagService.getHashtagNewsfeedPosts(input, user.id);
  }
}
