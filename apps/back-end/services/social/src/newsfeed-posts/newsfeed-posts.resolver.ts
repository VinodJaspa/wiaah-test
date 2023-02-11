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
import { MarketingTag, NewsfeedPost } from '@entities';
import { CreateNewsfeedPostInput, UpdateNewsfeedPostInput } from '@input';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { GetNewsfeedPostsByUserIdInput } from './dto';
import { TopHashtagNewsfeedPosts } from './entity';
import { PrismaService } from 'prismaService';

@Resolver(() => NewsfeedPost)
@UseGuards(new GqlAuthorizationGuard([]))
export class NewsfeedPostsResolver {
  constructor(
    private readonly newsfeedPostsService: NewsfeedPostsService,
    private readonly prisma: PrismaService,
  ) {}

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
  getNewsfeedPostsByUserId(@Args('args') args: GetNewsfeedPostsByUserIdInput) {
    return this.newsfeedPostsService.getNewsfeedPostsByUserId(
      args.userId,
      args.pagination,
    );
  }

  @Query(() => NewsfeedPost)
  getNewsfeedPostById(@Args('id') id: string) {
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
  async getTopHashtagNewsfeed(): Promise<TopHashtagNewsfeedPosts> {
    const topViewed = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        views: 'desc',
      },
    });

    const topReacted = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        reactionNum: 'desc',
      },
    });

    const topCommented = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        comments: 'desc',
      },
    });

    const topShared = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
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
}
