import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';

import { SearchModule } from './search/search.module';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: {
        username: 'admin',
        password: 'admin123',
      },
    }),
  ],
  exports: [ElasticsearchModule],
})
class ElasticGlobalModule {}

@Module({
  imports: [SearchModule, ElasticGlobalModule],
})
export class AppModule {}
