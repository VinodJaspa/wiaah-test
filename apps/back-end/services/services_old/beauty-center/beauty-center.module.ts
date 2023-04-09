import { Module } from '@nestjs/common';
import { ServiceOwnershipModule } from '@service-ownership';
import { PrismaService } from 'prismaService';
import { BeautyCenterService } from './beauty-center.service';
import { BeautyCenterResolver } from './beauty-center.resolver';
import { TreatmentCategoryResolver } from './treatment-category.resolver';
import { TreatmentCategoryService } from './treatment-category.service';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BeautyCenterElasticRepository,
  BeautyCenterRepository,
} from './repository';
import { BeautyCenterEventHandlers } from './events';
import { BeautyCenterCommndHandlers } from './commands';
import { BeautyCenterSagas } from './sagas';
import { BeautyCenterController } from './beauty-center.controller';
import { kafkaModule } from '@kafka-module';
import { BeautyCenterQueryHandlers } from './queries';
import { TreatmentResolver } from './treatment.resolver';
@Module({
  imports: [CqrsModule, ServiceOwnershipModule, kafkaModule],
  providers: [
    BeautyCenterResolver,
    TreatmentCategoryResolver,
    TreatmentCategoryService,
    BeautyCenterService,
    PrismaService,
    BeautyCenterElasticRepository,
    BeautyCenterRepository,
    TreatmentResolver,
    ...BeautyCenterEventHandlers,
    ...BeautyCenterCommndHandlers,
    ...BeautyCenterSagas,
    ...BeautyCenterQueryHandlers,
  ],
  controllers: [BeautyCenterController],
})
export class BeautyCenterModule {}
