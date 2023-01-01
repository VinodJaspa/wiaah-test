import { CommentsModule } from '@comments';
import { Module } from '@nestjs/common';
import { NewsfeedPostsModule } from '@posts-newsfeed';
import { ProfileModule } from '@profile-module';
import { PrismaService } from 'prismaService';
import { ContentDiscoveryService } from './content-discovery.service';
import { ContentDiscoveryController } from './content-discovery.controller';

@Module({
  imports: [ProfileModule, NewsfeedPostsModule, CommentsModule],
  providers: [ContentDiscoveryService, PrismaService],
  exports: [ContentDiscoveryService],
  controllers: [ContentDiscoveryController],
})
export class ContentDiscoveryModule {}
