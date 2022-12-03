import { CommentsModule } from '@comments';
import { Module } from '@nestjs/common';
import { NewsfeedPostsModule } from '@posts-newsfeed';
import { ProfileModule } from '@profile-module';
import { PrismaService } from 'prismaService';
import { ContentDiscoveryService } from './content-discovery.service';

@Module({
  imports: [ProfileModule, NewsfeedPostsModule, CommentsModule],
  providers: [ContentDiscoveryService, PrismaService],
  exports: [ContentDiscoveryService],
})
export class ContentDiscoveryModule {}
