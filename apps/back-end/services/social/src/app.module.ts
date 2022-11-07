import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { ProfileModule } from './profile/profile.module';
import { NewsfeedPostsModule } from './newsfeed-posts/newsfeed-posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionModule } from './reaction/reaction.module';
import { ContentDiscoveryModule } from './content-discovery/content-discovery.module';
import { ContentShareModule } from './content-share/content-share.module';
import { ContentManagementModule } from './content-management/content-management.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { SavedPostsModule } from './saved-posts/saved-posts.module';
import { StoryModule } from './story/story.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    NewsfeedPostsModule,
    CommentsModule,
    ReactionModule,
    ContentDiscoveryModule,
    ContentShareModule,
    ContentManagementModule,
    HashtagModule,
    SavedPostsModule,
    StoryModule,
  ],
})
export class AppModule {}
