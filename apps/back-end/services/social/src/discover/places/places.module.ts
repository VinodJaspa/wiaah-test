import { kafkaModule } from '@kafkaModule';
import { Module } from '@nestjs/common';
import { PlacesResolver } from './places.resolver';

@Module({
  imports: [kafkaModule],
  providers: [PlacesResolver],
})
export class PlacesModule {}
