import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PrismaService } from 'prismaService';
import { ProfileModule } from '@profile-module';
import { ContentManagementModule } from '@content-management';
import { CqrsModule } from '@nestjs/cqrs';
import { kafkaModule } from '@kafkaModule';

@Module({
  imports: [CqrsModule, ProfileModule, ContentManagementModule, kafkaModule],
  providers: [CommentsResolver, CommentsService, PrismaService],
  exports: [CommentsService],
})
export class CommentsModule {}
