import { Args, Query, Resolver } from '@nestjs/graphql';
import { Search } from './entities';
import { SearchInput } from './dto/search.input';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchRepository } from './repository';
import { ELASTIC_INDICES } from 'nest-utils';

@Resolver(() => Search)
export class SearchResolver {
  constructor(
    private readonly service: ElasticsearchService,
    private readonly repo: SearchRepository,
  ) {}

  @Query(() => [Search])
  async generalSearch(@Args('args') args: SearchInput): Promise<Search[]> {
    const { hits } = await this.service.search({
      index: [
        ELASTIC_INDICES.SHOP_NAME_INDEX,
        ELASTIC_INDICES.USER_PROFILE_INDEX,
        ELASTIC_INDICES.SERVICE_NAME_INDEX,
      ],
      q: args.searchQ,
    });

    console.log('search hits', { hits });
    return [];
  }
}
