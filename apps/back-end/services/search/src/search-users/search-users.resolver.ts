import { QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { SearchUserInput } from './dto';
import { User } from './entities';
import { SearchUsers } from './entities/search-user.entity';
import { SearchUserQuery } from './queries';

@Resolver(() => SearchUsers)
export class SearchUsersResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => SearchUsers)
  searchUsers(@Args('searchUserInput') args: SearchUserInput) {
    return this.queryBus.execute<SearchUserQuery, SearchUsers[]>(
      new SearchUserQuery(args.query),
    );
  }

  @ResolveField(() => [User])
  resloveUsers(@Parent() parent: SearchUsers) {
    return parent.usersIds;
  }
}
