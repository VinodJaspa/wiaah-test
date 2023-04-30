import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Args,
  Field,
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
  KnownError,
  NoReadPremissionPublicError,
  SubtractFromDate,
  accountType,
} from 'nest-utils';

import {
  CreateStoryCommand,
  DeleteStoryCommand,
  LikeStoryCommand,
} from '@story/command';
import {
  CreateStoryInput,
  DeleteStoryInput,
  GetAdminFilteredStoriesInput,
  LikeStoryInput,
} from '@story/dto';
import {
  AffiliationPost,
  NewsfeedPost,
  ServicePost,
  Story,
  StoryCursorPaginationResponse,
} from '@story/entities';
import {
  GetMyStoriesQuery,
  GetUserPrevStoryQuery,
  ViewUserStoryQuery,
} from '@story/queries';
import { StoryType } from './const';
import { ProductPost } from '@product-post/entities';
import { PrismaService } from 'prismaService';
import { Prisma } from 'prismaClient';
import { GetUserStoryInput } from './dto/get-user-story.input';

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

  @Query(() => StoryCursorPaginationResponse)
  async getUserStory(
    @Args('args') args: GetUserStoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<StoryCursorPaginationResponse> {
    await this.validateUserReadPremissions(user, args.userId);

    if (args.cursor) {
      const story = await this.prisma.story.findMany({
        where: {
          publisherId: args.userId,
          createdAt: {
            gte: SubtractFromDate(new Date(), { days: 1 }),
          },
        },
        cursor: {
          id: args.cursor,
        },
        orderBy: {
          createdAt: args.dir > 0 ? 'desc' : 'asc',
        },
        take: 2,
      });

      return {
        cursor: args.cursor,
        data: story[0],
        hasMore: story.length > 1,
        nextCursor: story.length > 1 ? story.at(1).id : undefined,
      };
    } else {
      const lastStory = await this.prisma.follow.findUnique({
        where: {
          followRelation: {
            followerUserId: user.id,
            followingUserId: args.userId,
          },
        },
      });

      lastStory.followerLastStorySeenAt;
    }

    return null;
  }

  @Query(() => [Story])
  getAdminFilteredStories(
    @Args('args') args: GetAdminFilteredStoriesInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    let filters: Prisma.StoryWhereInput[] = [];
    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.username) {
      filters.push({
        publisher: {
          username: {
            contains: args.username,
          },
        },
      });
    }

    if (args.legend) {
      filters.push({
        OR: [
          {
            content: { contains: args.legend },
          },
        ],
      });
    }

    if (args.likes) {
      filters.push({
        reactionsNum: {
          gte: args.likes,
        },
      });
    }

    return this.prisma.story.findMany({
      where: {},
    });
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

  async validateUserReadPremissions(
    user: AuthorizationDecodedUser,
    userId: string,
  ) {
    if (user.id !== userId || user.accountType !== accountType.ADMIN)
      throw new NoReadPremissionPublicError();
  }
}
