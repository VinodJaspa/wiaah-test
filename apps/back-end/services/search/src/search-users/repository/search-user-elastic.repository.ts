import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserElasticModel } from '../model/user.elastic.mdoel';

const ELASTIC_SEARCH_USER_INDEX = 'elastic.search.user.index';

@Injectable()
export class SearchUserElasticRepository {
  constructor(private readonly elsticService: ElasticsearchService) {}

  async searchUsersIds(query: string): Promise<string[]> {
    const res = await this.elsticService.search<UserElasticModel>({
      index: ELASTIC_SEARCH_USER_INDEX,
      size: 10,
      query: {
        multi_match: {
          query,
          fields: ['username'],
        },
      },
    });
    return res.hits.hits.map((v) => v._source.id);
  }

  async indexUser(user: UserElasticModel) {
    await this.elsticService.index({
      index: ELASTIC_SEARCH_USER_INDEX,
      id: user.dbId,
      document: user,
    });

    return true;
  }
}
