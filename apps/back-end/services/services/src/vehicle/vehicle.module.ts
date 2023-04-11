import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'prismaService';
import { ServiceOwnershipModule } from '@service-ownership';
import { ErrorHandlingModule } from 'nest-utils';
import { ErrorMessages } from '@utils';

import { VehicleCommandsHandlers } from './commands';
import { VehicleEventsHandlers } from './events';
import { VehicleSagasHandlers } from './sagas';
import { VehicleResolver } from './vehicle.resolver';
import {
  VehicleRepository,
  VehicleServiceElasticRepository,
  VehicleServiceRepository,
} from './repository';
import { VehicleQueriesHandlers } from './queries';
import { VehicleController } from './vehicle.controller';
import { kafkaModule } from '@kafka-module';

@Module({
  imports: [
    CqrsModule,
    ServiceOwnershipModule,
    ErrorHandlingModule.register({
      messages: ErrorMessages,
    }),
    kafkaModule,
  ],
  providers: [
    VehicleResolver,
    PrismaService,
    VehicleServiceRepository,
    VehicleServiceElasticRepository,
    VehicleRepository,
    ...VehicleQueriesHandlers,
    ...VehicleCommandsHandlers,
    ...VehicleEventsHandlers,
    ...VehicleSagasHandlers,
  ],
  controllers: [VehicleController],
})
export class VehicleModule {}
