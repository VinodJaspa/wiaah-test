import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SearchHashtag } from './entities/search-hashtag.entity';
import { CreateSearchHashtagInput } from './dto/create-search-hashtag.input';
import { UpdateSearchHashtagInput } from './dto/update-search-hashtag.input';
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
