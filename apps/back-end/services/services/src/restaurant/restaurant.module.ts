import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { PrismaService } from 'prismaService';

@Module({
  providers: [RestaurantResolver, RestaurantService, PrismaService],
})
export class RestaurantModule {}
