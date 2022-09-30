import { Module } from '@nestjs/common';
import { NewsfeedPostsService } from './newsfeed-posts.service';
import { NewsfeedPostsResolver } from './newsfeed-posts.resolver';
import { ProfileModule } from '@profile-module';
import { PrismaService } from 'prismaService';
import { ContentManagementModule } from '@content-management';

@Module({
  imports: [ProfileModule, ContentManagementModule],
  providers: [NewsfeedPostsResolver, NewsfeedPostsService, PrismaService],
  exports: [NewsfeedPostsService],
})
export class NewsfeedPostsModule {}
