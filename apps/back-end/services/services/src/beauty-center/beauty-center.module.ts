import { Module } from '@nestjs/common';
import { ServiceOwnershipModule } from '@service-ownership';
import { PrismaService } from 'prismaService';
import {
  BeautyCenterService,
  BeautyCenterResolver,
  TreatmentCategoryResolver,
  TreatmentCategoryService,
} from '@beauty-center';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BeautyCenterElasticRepository,
  BeautyCenterRepository,
} from './repository';
import { BeautyCenterEventHandlers } from './events';
import { BeautyCenterCommndHandlers } from './commands';
import { BeautyCenterSagas } from './sagas';
import { BeautyCenterController } from './beauty-center.controller';
@Module({
  imports: [CqrsModule, ServiceOwnershipModule],
  providers: [
    BeautyCenterResolver,
    TreatmentCategoryResolver,
    TreatmentCategoryService,
    BeautyCenterService,
    PrismaService,
    BeautyCenterElasticRepository,
    BeautyCenterRepository,
    ...BeautyCenterEventHandlers,
    ...BeautyCenterCommndHandlers,
    ...BeautyCenterSagas,
  ],
  controllers: [BeautyCenterController],
})
export class BeautyCenterModule {}
