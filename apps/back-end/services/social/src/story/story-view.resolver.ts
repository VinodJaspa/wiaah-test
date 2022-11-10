import { User } from '@entities';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { GetStorySeenByInput } from './dto';
import { StoryView } from './entities';
import { GetStoryViewsQuery } from './queries';

@Resolver(() => StoryView)
export class StoryViewResolver {
  constructor(private readonly querybus: QueryBus) {}
  @Query(() => [StoryView])
  getStoryViews(
    @Args('getStoryViewsInput') input: GetStorySeenByInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetStoryViewsQuery, StoryView[]>(
      new GetStoryViewsQuery(input, user),
    );
  }

  @ResolveField(() => User)
  viewer(@Parent() view: StoryView) {
    return { __typename: 'User', id: view.viewerId };
  }
}
