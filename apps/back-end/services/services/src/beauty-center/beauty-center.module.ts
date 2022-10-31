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
})
export class BeautyCenterModule {}
