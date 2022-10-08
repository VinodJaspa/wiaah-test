import { Module } from '@nestjs/common';
import { ProdutctsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { FilterModule } from './filter/filter.module';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { getUserFromRequest } from 'nest-utils';
import { Search } from './products/entities/search.entity';
import { Shop } from './products/entities/shop.entity';

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
        orphanedTypes: [Shop, Search],
      },
    }),
    ,
    ProdutctsModule,
    CategoryModule,
    FilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
