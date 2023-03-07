import { UserSavedPostsGroup } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { GetMySavedPostsInput } from './dto';
import { SavedPostsService } from './saved-posts.service';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([]))
export class SavedPostsResolver {
  constructor(private readonly savedPostsService: SavedPostsService) {}

  @Query(() => UserSavedPostsGroup)
  getMySavedPosts(
    @Args('args') args: GetMySavedPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.savedPostsService.getUserSavedPosts(args, user.id);
  }

  @Query(() => UserSavedPostsGroup)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetAccountSavedPosts(
    @Args('args') args: GetMySavedPostsInput,
    @Args('accountId') id: string,
  ) {
    return this.savedPostsService.getUserSavedPosts(args, id);
  }
}
