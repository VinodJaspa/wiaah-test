import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  vehicleEventsHandlers,
  vehicleCommandsHandlers,
} from '@vehicle-service';
import { PrismaService } from 'prismaService';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    VehicleResolver,
    PrismaService,
    ...vehicleEventsHandlers,
    ...vehicleCommandsHandlers,
  ],
})
export class VehicleModule {}
