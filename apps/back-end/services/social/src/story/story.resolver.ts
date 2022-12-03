import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';

import {
  CreateStoryCommand,
  DeleteStoryCommand,
  LikeStoryCommand,
} from './command';
import {
  CreateStoryInput,
  DeleteStoryInput,
  GetRecentStoriesInput,
  GetStorySeenByInput,
  LikeStoryInput,
} from './dto';
import {
  AffiliationPost,
  NewsfeedPost,
  Product,
  RecentStory,
  ServicePost,
  ShopPost,
  Story,
} from './entities';
import {
  GetMyStoriesQuery,
  GetRecentStoriesQuery,
  GetUserPrevStoryQuery,
  ViewUserStoryQuery,
} from './queries';

@Resolver(() => Story)
@UseGuards(new GqlAuthorizationGuard([]))
export class StoryResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
  ) {}

  @Query(() => Story)
  getUserStory(
    @Args('userId') publisherId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<ViewUserStoryQuery, Story>(
      new ViewUserStoryQuery(publisherId, user),
    );
  }

  @Query(() => Story)
  getUserPrevStory(
    @Args('userId') publisherId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetUserPrevStoryQuery, Story>(
      new GetUserPrevStoryQuery(publisherId, user),
    );
  }

  @Query(() => [Story])
  getMyStories(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.querybus.execute<GetMyStoriesQuery, Story[]>(
      new GetMyStoriesQuery(user),
    );
  }

  @Mutation(() => Story)
  deleteStory(
    @Args('deleteStoryInput') input: DeleteStoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Story> {
    return this.commandbus.execute<DeleteStoryCommand, Story>(
      new DeleteStoryCommand(input, user),
    );
  }

  @Mutation(() => Story)
  createStory(
    @Args('createStoryInput') input: CreateStoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<CreateStoryCommand, Story>(
      new CreateStoryCommand(input, user),
    );
  }

  @Mutation(() => Boolean)
  likeStory(
    @Args('likeStoryInput') input: LikeStoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<LikeStoryCommand>(
      new LikeStoryCommand(input, user),
    );
  }

  @ResolveField(() => Product)
  resloveProduct(@Parent() story: Story) {
    return {
      __typename: 'Product',
      id: story.productId,
    };
  }

  @ResolveField(() => NewsfeedPost)
  resloveNewsfeedPost(@Parent() story: Story) {
    return {
      __typename: 'NewsfeedPost',
      id: story.newsfeedPostId,
    };
  }

  @ResolveField(() => ShopPost)
  resloveShopPost(@Parent() story: Story) {
    return {
      __typename: 'ShopPost',
      id: story.shopPostId,
    };
  }

  @ResolveField(() => AffiliationPost)
  resloveAffiliationPost(@Parent() story: Story) {
    return {
      __typename: 'AffiliationPost',
      id: story.affiliationPostId,
    };
  }

  @ResolveField(() => ServicePost)
  resloveServicePost(@Parent() story: Story) {
    return {
      __typename: 'ServicePost',
      id: story.servicePostId,
    };
  }
}
