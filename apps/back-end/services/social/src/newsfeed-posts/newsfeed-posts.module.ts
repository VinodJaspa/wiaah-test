import { Module } from '@nestjs/common';
import { NewsfeedPostsService } from './newsfeed-posts.service';
import { NewsfeedPostsResolver } from './newsfeed-posts.resolver';
import { ProfileModule } from '@profile-module';
import { PrismaService } from 'prismaService';

@Module({
  imports: [ProfileModule],
  providers: [NewsfeedPostsResolver, NewsfeedPostsService, PrismaService],
  exports: [NewsfeedPostsService],
})
export class NewsfeedPostsModule {}
