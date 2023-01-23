import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Affiliation, AffiliationPost } from '@affiliation-post/entities';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserAffiliationPostsInput } from '@affiliation-post/dto';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { GetUserAffiliationPostsQuery } from '@affiliation-post/queries';
import { Account } from '@entities';

@Resolver(() => AffiliationPost)
export class AffiliationPostResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => [AffiliationPost])
  getAuthorAffiliationPosts(
    @Args('args') args: GetUserAffiliationPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetUserAffiliationPostsQuery(args.userId, user.id, args.pagination),
    );
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
