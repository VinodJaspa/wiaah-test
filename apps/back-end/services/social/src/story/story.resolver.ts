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
} from '@story/command';
import { CreateStoryInput, DeleteStoryInput, LikeStoryInput } from '@story/dto';
import {
  AffiliationPost,
  NewsfeedPost,
  ServicePost,
  Story,
} from '@story/entities';
import {
  GetMyStoriesQuery,
  GetUserPrevStoryQuery,
  ViewUserStoryQuery,
} from '@story/queries';
import { StoryType } from './const';
import { ProductPost } from '@product-post/entities';
import { PrismaService } from 'prismaService';

@Resolver(() => Story)
@UseGuards(new GqlAuthorizationGuard([]))
export class StoryResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Story)
  getStory(
    @Args('storyId') storyId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
  }

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
    @Args('storyId') storyId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetUserPrevStoryQuery, Story>(
      new GetUserPrevStoryQuery(storyId, user),
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

  @Mutation(() => Boolean)
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

  @ResolveField(() => NewsfeedPost)
  newsfeedPost(@Parent() story: Story) {
    if (story.type !== StoryType.post) return null;
    return {
      __typename: 'NewsfeedPost',
      id: story.referenceId,
    };
  }

  @ResolveField(() => ProductPost)
  shopPost(@Parent() story: Story) {
    if (story.type !== StoryType.product) return null;
    return {
      __typename: 'ShopPost',
      id: story.referenceId,
    };
  }

  @ResolveField(() => AffiliationPost)
  affiliationPost(@Parent() story: Story) {
    if (story.type !== StoryType.affiliation) return null;
    return {
      __typename: 'AffiliationPost',
      id: story.referenceId,
    };
  }

  @ResolveField(() => ServicePost)
  servicePost(@Parent() story: Story) {
    if (story.type !== StoryType.service) return null;
    return {
      __typename: 'ServicePost',
      id: story.referenceId,
    };
  }
}
