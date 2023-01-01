import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { Action, Community, NewsfeedPost } from '@community/entities';
import { GetCommunityPostsInput } from './dto';
import { GetCommunityPostsQuery } from './queries';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

@Resolver(() => Community)
export class CommunityResolver {
  constructor(private readonly commandbus: CommandBus) {}

  @Query(() => Community)
  getCommunityPosts(
    @Args('args') args: GetCommunityPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute(new GetCommunityPostsQuery(args.q, user.id));
  }

  @ResolveField(() => Action, { nullable: true })
  action(@Parent() parent: Community) {
    if (parent.type === 'action') {
      return { __typename: 'Action', id: parent.id };
    }
  }

  @ResolveField(() => NewsfeedPost, { nullable: true })
  newsfeedPost(@Parent() parent: Community) {
    if (parent.type === 'newsfeed-post') {
      return { __typename: 'NewsfeedPost', id: parent.id };
    }
  }
}
