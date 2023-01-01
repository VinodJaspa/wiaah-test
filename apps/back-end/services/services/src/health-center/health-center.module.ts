import { Module } from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { HealthCenterResolver } from './health-center.resolver';
import { PrismaService } from 'prismaService';
import { ServiceOwnershipModule } from '@service-ownership';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthCenterQueryHandlers } from './queries';
import {
  HealthCenterElasticRepository,
  HealthCenterRepository,
} from './repository';
import { healthCenterCommandHandlers } from './commands';
import { HealthCenterSagas } from './sagas';
import { HealthCenterController } from './health-center.controller';

@Module({
  imports: [ServiceOwnershipModule, CqrsModule],
  providers: [
    HealthCenterResolver,
    HealthCenterService,
    PrismaService,
    HealthCenterRepository,
    HealthCenterElasticRepository,
    ...HealthCenterSagas,
    ...healthCenterCommandHandlers,
    ...HealthCenterQueryHandlers,
  ],
  controllers: [HealthCenterController],
})
export class HealthCenterModule {}
