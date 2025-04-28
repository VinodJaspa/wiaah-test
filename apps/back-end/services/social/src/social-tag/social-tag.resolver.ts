import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SocialTag } from './entities/social-tag.entity';
import { PrismaService } from 'prismaService';
import { GetContentTaggedProfilesInput } from './dto/get-content-tagged-profiles.input';
import { Profile, ProfileFollow } from '@entities';
import { ContentHostType } from 'prismaClient';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

@Resolver(() => SocialTag)
export class SocialTagResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => SocialTag, { nullable: true })
  async getContentTaggedProfile(
    @Args('args') args: GetContentTaggedProfilesInput,
  ): Promise<SocialTag | null> {
    switch (args.contentType) {
      case ContentHostType.post_newsfeed:
        const post = await this.prisma.newsfeedPost.findUnique({
          where: {
            id: args.contentId,
          },
        });

        return {
          contentId: post.id,
          taggedUserIds: post.tags.map((v) => v.userId),
        };

      case ContentHostType.action:
        const action = await this.prisma.action.findUnique({
          where: {
            id: args.contentId,
          },
        });

        return {
          contentId: action.id,
          taggedUserIds: action.tags.map((v) => v.userId),
        };

      case ContentHostType.story:
        const story = await this.prisma.story.findUnique({
          where: {
            id: args.contentId,
          },
        });

        return {
          contentId: story.id,
          taggedUserIds: story.tags.map((v) => v.userId),
        };
      default:
        return null;
    }
  }

  @ResolveField(() => [ProfileFollow])
  async taggedProfiles(
    @Parent() socialTag: SocialTag | null,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileFollow[]> {
    if (!socialTag) return [] as ProfileFollow[];

    const followsPromise = this.prisma.follow.findMany({
      where: {
        followerUserId: user.id,
        followingUserId: {
          in: socialTag.taggedUserIds,
        },
      },
    });

    const profilesPromise = this.prisma.profile.findMany({
      where: {
        id: {
          in: socialTag.taggedUserIds,
        },
      },
    });

    const myFollows = await followsPromise;
    const profiles = await profilesPromise;

    return profiles.map((v) => ({
      ...v,
      isFollowed: !!myFollows.find((e) => e.followingUserId === v.ownerId),
    }));
  }
}
