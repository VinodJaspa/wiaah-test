import { Args, Query, Resolver } from '@nestjs/graphql';
import { AffiliationPost } from '@affiliation-post/entities';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserAffiliationPostsInput } from '@affiliation-post/dto';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { GetUserAffiliationPostsQuery } from '@affiliation-post/queries';

@Resolver(() => AffiliationPost)
export class AffiliationPostResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Query(() => [AffiliationPost])
  getAuthorAffiliationPosts(
    @Args('args') args: GetUserAffiliationPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetUserAffiliationPostsQuery(args.userId, user.id, args.pagination),
    );
  }
}
