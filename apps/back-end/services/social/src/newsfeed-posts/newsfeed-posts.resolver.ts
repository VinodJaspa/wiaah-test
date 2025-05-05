import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NewsfeedPostsService } from './newsfeed-posts.service';
import {
  NewsfeedPost,
  NewsfeedPostsPaginationResponse,
  Product,
} from '@entities';
import { CreateNewsfeedPostInput, UpdateNewsfeedPostInput } from '@input';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { GetNewsfeedPostsByUserIdInput, GetPostsByHashtagInput } from './dto';
import { TopHashtagNewsfeedPosts } from './entity';
import { PrismaService } from 'prismaService';
import { GetMyNewsfeedPostsInput } from './dto/get-my-newsfeed-posts.input';
import { Affiliation } from '@affiliation-post/entities';
import { Service } from 'src/service-post/entities/service-post.entity';
import { ContentHostType, PostType } from 'prismaClient';

@Resolver(() => NewsfeedPost)
@UseGuards(new GqlAuthorizationGuard([]))
export class NewsfeedPostsResolver {
  constructor(
    private readonly newsfeedPostsService: NewsfeedPostsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => NewsfeedPostsPaginationResponse)
  getTrendingHashtagPosts(@Args('args') args: GetPostsByHashtagInput) {
    return this.prisma.newsfeedPost.findMany({
      take: args.take,
      cursor: {
        id: args.cursor,
      },
      where: {
        hashtags: {
          some: {
            tag: args.hashtag,
          },
        },
        type: args.postType,
      },

      orderBy: {
        popularity: 'desc',
      },
    });
  }

  @Mutation(() => NewsfeedPost)
  createNewsfeedPost(
    @Args('createNewsfeedPostInput')
    createNewsfeedPostInput: CreateNewsfeedPostInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.createNewsfeedPost(
      createNewsfeedPostInput,
      user.id,
    );
  }

  @Query(() => [NewsfeedPost])
  getMyNewsfeedPosts(
    @Args('args') args: GetMyNewsfeedPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.getUserNewsfeedPostsListing(
      user.id,
      args.type,
      args.pagination,
    );
  }

  @Query(() => [NewsfeedPost])
  getPostsByUserId(@Args('args') args: GetNewsfeedPostsByUserIdInput) {
    return this.newsfeedPostsService.getNewsfeedPostsByUserId(
      args.userId,
      args.type,
      args.pagination,
    );
  }

  @Query(() => NewsfeedPost)
  getNewsfeedPostById(@Args('id') id: string) {
    return this.newsfeedPostsService.getNewsfeedPostById(id);
  }

  @Query(() => NewsfeedPost)
  getSocialPostById(@Args('id') id: string) {
    return this.newsfeedPostsService.getNewsfeedPostById(id);
  }

  @Mutation(() => NewsfeedPost)
  updateNewsfeedPost(
    @Args('updateNewsfeedPostInput')
    updateNewsfeedPostInput: UpdateNewsfeedPostInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.update(updateNewsfeedPostInput, user.id);
  }

  @Query(() => TopHashtagNewsfeedPosts)
  async getTopHashtagNewsfeed(
    @Args('tag') tag: string,
  ): Promise<TopHashtagNewsfeedPosts> {
    const topViewed = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
        hashtags: {
          some: {
            tag,
          },
        },
      },
      orderBy: {
        views: 'desc',
      },
    });

    const topReacted = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
        hashtags: {
          some: {
            tag,
          },
        },
      },
      orderBy: {
        reactionNum: 'desc',
      },
    });

    const topCommented = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
        hashtags: {
          some: {
            tag,
          },
        },
      },
      orderBy: {
        comments: 'desc',
      },
    });

    const topShared = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
        hashtags: {
          some: {
            tag,
          },
        },
      },
      orderBy: {
        shares: 'desc',
      },
    });

    return {
      viewed: topViewed,
      commented: topCommented,
      liked: topReacted,
      shared: topShared,
    };
  }

  @Mutation(() => NewsfeedPost)
  removeNewsfeedPost(
    @Args('id', { type: () => Int }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.newsfeedPostsService.deleteNewsfeedPost(id, user.id);
  }

  @ResolveField(() => Affiliation, { nullable: true })
  affiliation(@Parent() post: NewsfeedPost) {
    return {
      __typename: 'affiliation',
      id: post.affiliationId,
    };
  }

  @ResolveField(() => [Product], { nullable: true })
  products(@Parent() post: NewsfeedPost) {
    return {
      __typename: 'product',
      id: post.productIds,
    };
  }

  @ResolveField(() => Service, { nullable: true })
  service(@Parent() post: NewsfeedPost) {
    return {
      __typename: 'service',
      id: post.serviceId,
    };
  }

  @ResolveField(() => Boolean)
  async pinned(
    @Parent() post: NewsfeedPost,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const pinned = await this.prisma.pinnedContent.findUnique({
      where: {
        userId_contentId: {
          contentId: post.id,
          userId: user.id,
        },
      },
    });

    return !!pinned;
  }

  @ResolveField(() => Boolean)
  async isLiked(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Parent() post: NewsfeedPost,
  ) {
    const like = await this.prisma.contentReaction.findUnique({
      where: {
        hostId_hostType_reactedByUserId: {
          hostId: post.id,
          hostType:
            post.type === PostType.newsfeed_post
              ? ContentHostType.post_newsfeed
              : post.type === PostType.shop_post
                ? ContentHostType.post_shop
                : post.type === PostType.service_post
                  ? ContentHostType.post_service
                  : post.type === PostType.affiliation_post
                    ? ContentHostType.post_affiliation
                    : undefined,
          reactedByUserId: user.id,
        },
      },
    });

    return !!like;
  }

  @ResolveField(() => Boolean)
  async isCommented(
    @Parent() post: NewsfeedPost,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        hostId: post.id,
        userId: user.id,
      },
    });

    return !!comment;
  }

  @ResolveField(() => Boolean)
  async isSaved(
    @Parent() post: NewsfeedPost,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const saved = await this.prisma.savedItem.findUnique({
      where: {
        userId_itemId: {
          itemId: post.id,
          userId: user.id,
        },
      },
    });

    return !!saved;
  }

  @ResolveField(() => String)
  thumbnail(@Parent() post: NewsfeedPost) {
    return post.attachments[0];
  }
}
