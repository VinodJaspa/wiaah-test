import { UserSavedPostsGroup } from '@entities';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { GetMySavedPostsInput } from './dto';
import { SavedPostsService } from './saved-posts.service';

@Resolver()
export class SavedPostsResolver {
  constructor(private readonly savedPostsService: SavedPostsService) {}

  @Query(() => UserSavedPostsGroup)
  getMySavedPosts(
    @Args('args') args: GetMySavedPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.savedPostsService.getUserSavedPosts(args, user.id);
  }
}
