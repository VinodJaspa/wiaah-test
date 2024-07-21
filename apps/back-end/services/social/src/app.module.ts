import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';

// Importing Modules
import { PrismaModule } from './prisma.module';
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
import { HiddenContentModule } from './hidden-content/hidden-content.module';
import { ServicePostModule } from './service-post/service-post.module';
import { CommunityModule } from '@community/community.module';
import { FriendsModule } from '@friends/friends.module';
import { PlacesModule } from '@places/places.module';
import { MarketingTagModule } from './marketing-tag/marketing-tag.module';
import { ProfileStatisticsModule } from './profile-statistics/profile-statistics.module';
import { SocialTagModule } from './social-tag/social-tag.module';
import { AudioModule } from './audio/audio.module';
import { EffectModule } from './effect/effect.module';
import { CameraFilterModule } from './camera-filter/camera-filter.module';
import { ContentViewModule } from './content-view/content-view.module';
import { PinnedContentModule } from './pinned-content/pinned-content.module';
import { ProfileAdminModule } from '@profile/profile-admin.module';
import { NewsfeedPostsAdminModule } from '@posts-newsfeed/newsfeed-posts-admin.module';

// Importing Entities
import { Shop } from '@profile/resolvers/profile.shop.resolver';
import { Account } from './entities/extends';

interface GraphQLContext {
  req: Request;
  res: Response;
}

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      buildSchemaOptions: {
        orphanedTypes: [Shop, Account],
      },
      autoSchemaFile: 'schema.graphql',
      context: ({ req, res }: GraphQLContext) => {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    ProfileModule,
    NewsfeedPostsModule,
    ProfileAdminModule,
    NewsfeedPostsAdminModule,
    CommentsModule,
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
    MarketingTagModule,
    ProfileStatisticsModule,
    SocialTagModule,
    AudioModule,
    EffectModule,
    CameraFilterModule,
    ContentViewModule,
    PinnedContentModule,
  ],
})
export class AppModule { }
