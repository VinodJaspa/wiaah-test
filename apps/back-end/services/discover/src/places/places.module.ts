import { Module } from '@nestjs/common';
import { kafkaModule } from '../kafka.module';
import { PlacesResolver } from './places.resolver';

@Module({
  imports: [kafkaModule],
  providers: [PlacesResolver],
})
export class PlacesModule {}
