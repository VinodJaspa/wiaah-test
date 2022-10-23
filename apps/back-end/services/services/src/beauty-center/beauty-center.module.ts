import { Module } from '@nestjs/common';
import { ServiceOwnershipModule } from '@service-ownership';
import { PrismaService } from 'prismaService';
import {
  BeautyCenterService,
  BeautyCenterResolver,
  TreatmentCategoryResolver,
  TreatmentCategoryService,
} from '@beauty-center';
@Module({
  imports: [ServiceOwnershipModule],
  providers: [
    BeautyCenterResolver,
    TreatmentCategoryResolver,
    TreatmentCategoryService,
    BeautyCenterService,
    PrismaService,
  ],
})
export class BeautyCenterModule {}
