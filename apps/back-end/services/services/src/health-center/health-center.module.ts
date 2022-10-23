import { Module } from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { HealthCenterResolver } from './health-center.resolver';
import { PrismaService } from 'prismaService';
import { ServiceOwnershipModule } from '@service-ownership';

@Module({
  imports: [ServiceOwnershipModule],
  providers: [HealthCenterResolver, HealthCenterService, PrismaService],
})
export class HealthCenterModule {}
