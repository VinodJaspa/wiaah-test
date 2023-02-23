import { Module } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { MaintenanceResolver } from './maintenance.resolver';

@Module({
  providers: [MaintenanceResolver, PrismaService],
})
export class MaintenanceModule {}
