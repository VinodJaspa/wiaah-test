import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { HotelModule } from './hotel/hotel.module';
import { RestuarntModule } from './restuarnt/restuarnt.module';
import { RestauarntModule } from './restauarnt/restauarnt.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: (req) => {
        const user = getUserFromRequest(req);
        return { ...req, user };
      },
    }),
    CategoryModule,
    HotelModule,
    RestuarntModule,
    RestauarntModule,
    RestaurantModule,
  ],
})
export class AppModule {}
