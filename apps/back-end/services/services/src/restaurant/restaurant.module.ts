import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { PrismaService } from 'prismaService';
import { ServiceOwnershipModule } from '@service-ownership';
import {
  RestaurantElasticSearchRepository,
  RestaurantRepository,
} from './repository';
import { SearchFilteredRestaurantQueryHandler } from './queries/handlers/search-filtered-restaurant.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ServiceOwnershipModule],
  providers: [
    RestaurantResolver,
    RestaurantService,
    PrismaService,
    RestaurantRepository,
    RestaurantElasticSearchRepository,
    SearchFilteredRestaurantQueryHandler,
  ],
})
export class RestaurantModule {}
