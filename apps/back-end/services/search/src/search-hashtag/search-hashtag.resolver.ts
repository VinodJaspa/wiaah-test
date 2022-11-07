import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchHashtag } from './entities/search-hashtag.entity';
import { QueryBus } from '@nestjs/cqrs';
import { SearchHashtagQuery } from './queries';

@Resolver(() => SearchHashtag)
export class SearchHashtagResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => SearchHashtag)
  searchHashtags(@Args('query') query: string) {
    return this.querybus.execute<SearchHashtagQuery, SearchHashtag>(
      new SearchHashtagQuery(query),
    );
  }
}
