import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'prismaService';
import { ContentManagementService } from './content-management.service';

@Module({
  imports: [CqrsModule],
  providers: [ContentManagementService, PrismaService],
  exports: [ContentManagementService],
})
export class ContentManagementModule {}
