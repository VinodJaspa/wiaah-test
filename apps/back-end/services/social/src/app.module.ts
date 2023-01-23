import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

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
import { BlockModule } from './block/block.module';
import { PrivacyModule } from './privacy/privacy.module';
import { ProductPostModule } from './product-post/product-post.module';
import { AffiliationPostModule } from './affiliation-post/affiliation-post.module';
import { ActionModule } from './action/action.module';
import { PrismaModule } from './prisma.module';
import { HiddenContentModule } from './hidden-content/hidden-content.module';
import { ProfileAdminModule } from '@profile/profile-admin.module';
import { NewsfeedPostsAdminModule } from '@posts-newsfeed/newsfeed-posts-admin.module';
import { ServicePostModule } from './service-post/service-post.module';
import { CommunityModule } from '@community/community.module';
import { FriendsModule } from '@friends/friends.module';
import { PlacesModule } from '@places/places.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: 'schema.graphql',
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    NewsfeedPostsModule,
    ProfileAdminModule,
    NewsfeedPostsAdminModule,
    // CommentsModule,
    ReactionModule,
    ContentDiscoveryModule,
    ContentShareModule,
    ContentManagementModule,
    HashtagModule,
    SavedPostsModule,
    StoryModule,
    BlockModule,
    PrivacyModule,
    ProductPostModule,
    AffiliationPostModule,
    ActionModule,
    HiddenContentModule,
    ServicePostModule,
    CommunityModule,
    FriendsModule,
    PlacesModule,
  ],
})
export class AppModule {}
