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
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { ShippingRulesModule } from './shipping-rules';
import { PrismaService } from './prisma.service';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { ProductsAdminModule } from '@products/products-admin.module';
import { ShippingTypeRuleModule } from './shipping-type-rule/shipping-type-rule.module';
import { ShippingDetailsModule } from './shipping-details/shipping-details.module';
import { DiscountModule } from './discount/discount.module';
import { CashbackModule } from './cashback/cashback.module';
import { WorkingScheduleModule } from './working-schedule/working-schedule.module';
import { Service } from '@shop/entities/extends';
import { ProductAttributeModule } from './product-attribute/product-attribute.module';

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
    ProductAttributeModule,
  ],
  exports: [ElasticsearchModule],
})
export class ElasticGlobalModule {}

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaGlobalModule {}

@Module({
  imports: [
    PrismaGlobalModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      buildSchemaOptions: {
        orphanedTypes: [Service],
      },
      context({ req, res }) {
        const user = getUserFromRequest(req);
        const userIp =
          req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // console.log( req,"user");
        return { req, res, user: { ...user, ip: userIp } };
      },
    }),
    WorkingScheduleModule,
    ShopModule,
    ProductsModule,
    CategoryModule,
    FilterModule,
    ElasticGlobalModule,
    ProductsAdminModule,
    ShippingAddressModule,
    ShippingTypeRuleModule,
    DiscountModule,
    CashbackModule,
    // ShippingSettingsModule,
    ShippingDetailsModule,
    ShippingRulesModule,
  ],
  controllers: [],
})
export class AppModule {}
