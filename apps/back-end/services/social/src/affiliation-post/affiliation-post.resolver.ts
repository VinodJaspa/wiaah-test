import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Affiliation, AffiliationPost } from '@affiliation-post/entities';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetRecommendedAffiliationPostsInput,
  GetUserAffiliationPostsInput,
} from '@affiliation-post/dto';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlCurrentUser,
} from 'nest-utils';
import { GetUserAffiliationPostsQuery } from '@affiliation-post/queries';
import { Account } from '@entities';
import { PrismaService } from 'prismaService';
import { GetAffiliationPostInput } from './dto/get-affiliation-post.input';
import { PostVisibility } from 'prismaClient';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => AffiliationPost)
export class AffiliationPostResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [AffiliationPost])
  getAuthorAffiliationPosts(
    @Args('args') args: GetUserAffiliationPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetUserAffiliationPostsQuery(args.userId, user?.id, args.pagination),
    );
  }

  @Query(() => AffiliationPost)
  async getAffiliationPost(@Args('args') args: GetAffiliationPostInput) {
    const allowedRoles: PostVisibility[] = [PostVisibility.public];
    const res = await this.prisma.affiliationPost.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!res || !allowedRoles.includes(res.visibility))
      throw new NotFoundException('post not found');

    return res;
  }

  @Query(() => [AffiliationPost])
  async getRecommendedAffiliationPosts(
    @Args('args') args: GetRecommendedAffiliationPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);
    const res = await this.prisma.affiliationPost.findMany({
      where: {
        visibility: {
          in: ['public'],
        },
      },
      take,
      skip,
    });
    return res;
  }

  @ResolveField(() => Account)
  user(@Parent() post: AffiliationPost) {
    return {
      __typename: 'Account',
      id: post.userId,
    };
  }

  @ResolveField(() => Affiliation)
  affiliation(@Parent() post: AffiliationPost) {
    return {
      __typename: 'Affiliation',
      id: post.affiliationId,
    };
  }
}
