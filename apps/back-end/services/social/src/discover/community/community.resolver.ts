import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { Community } from '@community/entities';
import { GetCommunityPostsInput } from './dto';
import { GetCommunityPostsQuery } from './queries';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { NewsfeedPost } from '@entities';
import { Action } from '@action/entities';
import { PrismaService } from 'prismaService';

@Resolver(() => Community)
export class CommunityResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private prisma: PrismaService,
  ) {}

  @Query(() => [Community])
  getCommunityPosts(
    @Args('args') args: GetCommunityPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute(new GetCommunityPostsQuery(args.q, user.id));
  }

  @ResolveField(() => Action, { nullable: true })
  action(@Parent() parent: Community) {
    if (parent.type === 'action') {
      return this.prisma.action.findUnique({
        where: {
          id: parent.id,
        },
      });
    }
  }

  @ResolveField(() => NewsfeedPost, { nullable: true })
  newsfeedPost(@Parent() parent: Community) {
    if (parent.type === 'newsfeed-post') {
      return this.prisma.newsfeedPost.findUnique({
        where: {
          id: parent.id,
        },
      });
    }
  }
}
