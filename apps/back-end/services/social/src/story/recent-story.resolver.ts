import { Account } from '@entities';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

import { GetRecentStoriesInput } from './dto';
import { RecentStory } from './entities';
import { GetRecentStoriesQuery } from './queries';

@Resolver(() => RecentStory)
export class RecentStoryResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => [RecentStory])
  getRecentStories(
    @Args('getRecentStoryInput', {
      nullable: true,
      defaultValue: {
        pagination: { page: 1, take: 10 },
      } as GetRecentStoriesInput,
    })
    args: GetRecentStoriesInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetRecentStoriesQuery, RecentStory[]>(
      new GetRecentStoriesQuery(args, user),
    );
  }

  @ResolveField(() => Account)
  resloveUser(@Parent() recentStory: RecentStory) {
    return { __typename: 'User', id: recentStory.userId };
  }
}
