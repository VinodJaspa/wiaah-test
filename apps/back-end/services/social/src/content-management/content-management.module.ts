import { Module } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { ContentManagementService } from './content-management.service';

@Module({
  providers: [ContentManagementService, PrismaService],
  exports: [ContentManagementService],
})
export class ContentManagementModule {}
