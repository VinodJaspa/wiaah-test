import { Module } from '@nestjs/common';
import { ServiceOwnershipService } from './service-ownership.service';
import { ServiceOwnershipResolver } from './service-ownership.resolver';
import { PrismaService } from 'prismaService';

@Module({
  providers: [ServiceOwnershipResolver, ServiceOwnershipService, PrismaService],
  exports: [ServiceOwnershipService],
})
export class ServiceOwnershipModule {}
