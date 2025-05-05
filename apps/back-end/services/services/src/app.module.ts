import { Module, Global } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {
  ErrorHandlingModule,
  getUserFromRequest,
  TranslationModule,
} from 'nest-utils';
import { ErrorMessages } from '@utils';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { PrismaService } from 'prismaService';
import { ServiceModule } from './service/service.module';
import { HotelModule } from './hotel';
import { WorkingScheduleModule } from './working-schedule/working-schedule.module';
import { InsuranceModule } from './insurance/insurance.module';
import { ServiceDiscoveryModule } from './service-discovery/service-discovery.module';
import { ServiceDiscountModule } from './service-discount/service-discount.module';
import { ServiceCashbackModule } from './service-cashback/service-cashback.module';
import { BookServiceModule } from '@book-service/book-service.module';
import { ServiceFiltersModule } from './service-filters/service-filters.module';
import { RestaurantModule } from '@restaurant';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: {
        password: 'admin123',
        username: 'admin',
      },
    }),
    ServiceFiltersModule,
  ],
  exports: [ElasticsearchModule],
  providers: [],
})
class GlobalElasticsearchModule {}

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GlobalPrismaService {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: './schema.graphql',
      context: (ctx) => {
        const user = getUserFromRequest(ctx.req);
        return { ...ctx, user, req: ctx.req };
      },
    }),
    GlobalElasticsearchModule,
    ErrorHandlingModule.register({
      messages: ErrorMessages,
    }),
    ServiceDiscountModule,
    ServiceCashbackModule,
    ServiceModule,
    InsuranceModule,
    ServiceDiscoveryModule,
    GlobalPrismaService,
    CategoryModule,
    BookServiceModule,
    HotelModule,
    RestaurantModule,
  ],
})
export class AppModule {}
