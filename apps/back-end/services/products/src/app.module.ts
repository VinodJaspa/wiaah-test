import { Global, Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { FilterModule } from './filter/filter.module';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';
import { ShopModule } from '@shop';
import { ShippingDetailsModule } from '@shipping-details';
import { ShippingRulesModule } from '@shipping-rules';
import { ShippingSettingsModule } from '@shipping-settings';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { Search } from './products/entities/search.entity';
import { PrismaService } from './Prisma.service';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_NODE,
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
      },
    }),
  ],
  exports: [ElasticsearchModule],
})
class ElasticGlobalModule {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },

      buildSchemaOptions: {
        orphanedTypes: [Search],
      },
    }),
    ShopModule,
    ProductsModule,
    CategoryModule,
    FilterModule,
    ElasticGlobalModule,
    // ShippingSettingsModule,
    // ShippingDetailsModule,
    // ShippingRulesModule,
  ],
  controllers: [],
})
export class AppModule {}
