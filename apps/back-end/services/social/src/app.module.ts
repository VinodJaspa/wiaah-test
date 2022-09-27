import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { NewsfeedPostsModule } from './newsfeed-posts/newsfeed-posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionModule } from './reaction/reaction.module';
import { ContentDiscoveryModule } from './content-discovery/content-discovery.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
