import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { PrismaService } from 'prismaService';
import { ServiceOwnershipModule } from '@service-ownership';

@Module({
  imports: [ServiceOwnershipModule],
  providers: [RestaurantResolver, RestaurantService, PrismaService],
})
export class RestaurantModule {}
