import { ContentManagementModule } from '@content-management';
import { kafkaModule } from '@kafkaModule';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfileService } from '@profile-service';
import { PrismaService } from 'prismaService';
import { NewsfeedPostsAdminResolver } from './newsfeed-posts-admin.resolver';
import { NewsfeedPostsService } from './newsfeed-posts.service';

@Module({
  imports: [kafkaModule, CqrsModule, ContentManagementModule],
  providers: [
    NewsfeedPostsAdminResolver,
    PrismaService,
    ProfileService,
    NewsfeedPostsService,
  ],
})
export class NewsfeedPostsAdminModule {}
