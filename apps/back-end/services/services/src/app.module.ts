import { Global, Module } from '@nestjs/common';
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
import { HotelModule } from './hotel/hotel.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ServiceOwnershipModule } from './service-ownership/service-ownership.module';
import { HealthCenterModule } from './health-center/health-center.module';
import { BeautyCenterModule } from './beauty-center/beauty-center.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ServiceModule } from './service/service.module';
import { WorkingScheduleModule } from './working-schedule/working-schedule.module';
import { InsuranceModule } from './insurance/insurance.module';
import { ServiceDiscoveryModule } from './service-discovery/service-discovery.module';
import { ServiceDiscountModule } from './service-discount/service-discount.module';
import { ServiceCashbackModule } from './service-cashback/service-cashback.module';

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

        return { ...ctx, user };
      },
    }),
    GlobalElasticsearchModule,
    ErrorHandlingModule.register({
      messages: ErrorMessages,
    }),
    ServiceDiscountModule,
    ServiceCashbackModule,
    ServiceModule,
    WorkingScheduleModule,
    InsuranceModule,
    ServiceDiscoveryModule,
    GlobalPrismaService,
    TranslationModule,
    CategoryModule,
    HotelModule,
    RestaurantModule,
    ServiceOwnershipModule,
    HealthCenterModule,
    BeautyCenterModule,
    VehicleModule,
  ],
})
export class AppModule {}
