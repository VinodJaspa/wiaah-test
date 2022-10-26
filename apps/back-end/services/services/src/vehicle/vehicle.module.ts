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
import { VehicleServiceRepository } from './repository';
import { VehicleQueriesHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    ServiceOwnershipModule,
    ErrorHandlingModule.register({
      messages: ErrorMessages,
    }),
  ],
  providers: [
    VehicleResolver,
    PrismaService,
    VehicleServiceRepository,
    ...VehicleQueriesHandlers,
    ...VehicleCommandsHandlers,
    ...VehicleEventsHandlers,
    ...VehicleSagasHandlers,
  ],
})
export class VehicleModule {}
