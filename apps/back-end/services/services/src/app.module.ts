import { Module } from '@nestjs/common';
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
import { HotelModule } from './hotel/hotel.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ServiceOwnershipModule } from './service-ownership/service-ownership.module';
import { HealthCenterModule } from './health-center/health-center.module';
import { ErrorMessages } from '@utils';
import { BeautyCenterModule } from './beauty-center/beauty-center.module';
import { VehicleModule } from './vehicle/vehicle.module';
import gql from 'graphql-tag';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: (ctx) => {
        const user = getUserFromRequest(ctx.req);

        return { ...ctx, user };
      },
    }),
    ErrorHandlingModule.register({
      messages: ErrorMessages,
    }),
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
