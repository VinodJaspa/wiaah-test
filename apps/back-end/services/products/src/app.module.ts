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
import { ShopModule } from '@shop';
import { ShippingDetailsModule } from '@shipping-details';
import { ShippingRulesModule } from '@shipping-rules';
import { ShippingSettingsModule } from '@shipping-settings';

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
    ProdutctsModule,
    CategoryModule,
    FilterModule,
    ShippingSettingsModule,
    ShippingDetailsModule,
    ShippingRulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
