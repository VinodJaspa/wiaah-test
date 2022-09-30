import { UserSavedPostsGroup } from '@entities';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { SavedPostsService } from './saved-posts.service';

@Resolver()
export class SavedPostsResolver {
  constructor(private readonly savedPostsService: SavedPostsService) {}

  @Query(() => UserSavedPostsGroup)
  getMySavedPosts(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.savedPostsService.getUserSavedPosts(user.id);
  }
}
