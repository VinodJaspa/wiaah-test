import { Module } from '@nestjs/common';
import { NewsfeedPostsService } from './newsfeed-posts.service';
import { NewsfeedPostsResolver } from './newsfeed-posts.resolver';
import { ProfileModule } from '@profile-module';
import { PrismaService } from 'prismaService';
import { ContentManagementModule } from '@content-management';
import { NewsfeedPostEventHandlers } from './events';

import { CqrsModule } from '@nestjs/cqrs';
import { kafkaModule } from '@kafkaModule';
import { NewsfeedPostsController } from './newsfeed-posts.controller';
import { newsfeedCommandHandlers } from './commands';
import { NewsfeedPostsRepository } from './repository';

@Module({
  imports: [ProfileModule, ContentManagementModule, CqrsModule, kafkaModule],
  providers: [
    NewsfeedPostsResolver,
    NewsfeedPostsService,
    PrismaService,
    NewsfeedPostsRepository,
    ...NewsfeedPostEventHandlers,
    ...newsfeedCommandHandlers,
  ],
  exports: [NewsfeedPostsService],
  controllers: [NewsfeedPostsController],
})
export class NewsfeedPostsModule {}
