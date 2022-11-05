import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { SearchModule } from './search/search.module';
import { SearchUsersModule } from './search-users/search-users.module';
import { SearchHashtagModule } from './search-hashtag/search-hashtag.module';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_NODE || 'http://localhost:9200',
      auth: {
        username: process.env.ELASTIC_USERNAME || 'admin',
        password: process.env.ELASTIC_PASSWORD || 'admin123',
      },
    }),
    SearchUsersModule,
    SearchHashtagModule,
  ],
  exports: [ElasticsearchModule],
})
class ElasticGlobalModule {}

@Module({
  imports: [SearchModule, ElasticGlobalModule],
})
export class AppModule {}
