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
import { RestaurantController } from './restaurant.controller';
import { kafkaModule } from '@kafka-module';
import { DishResolver } from './dish.resolver';

@Module({
  imports: [CqrsModule, ServiceOwnershipModule, kafkaModule],
  providers: [
    RestaurantResolver,
    RestaurantService,
    PrismaService,
    RestaurantRepository,
    DishResolver,
    RestaurantElasticSearchRepository,
    SearchFilteredRestaurantQueryHandler,
  ],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
