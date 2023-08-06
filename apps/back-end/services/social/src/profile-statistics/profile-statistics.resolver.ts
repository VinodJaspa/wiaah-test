import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProfileStatistics } from './entities/profile-statistic.entity';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  SubtractFromDate,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetProfileStatisticsInput } from './dto/get-profile-statistics.input';
import { ProfileOverviewStatistics } from './entities/profile-overview-statistics.entity';
import { ProfileReachedAudience } from './entities/profile-reached-audinece';
import { NewsfeedPost, Story, StoryView } from '@story/entities';
import { GetProfilePopularStoriesViewsInput } from './dto/get-profile-popular-stories-views.input';
import {
  ProfileVisitDetails,
  ProfileVisitsDetails,
} from './entities/profile-visits-details';
import { GetProfileVisitsDetailsInput } from './dto/get-profile-visits-details.input';
import { GetTopProfilePostsInput } from './dto/get-top-profile-stories.input';

@Resolver(() => ProfileStatistics)
@UseGuards(new GqlAuthorizationGuard([]))
export class ProfileStatisticsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => ProfileStatistics)
  async getProfileStatistics(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') args: GetProfileStatisticsInput,
  ): Promise<ProfileStatistics> {
    await this.validateAuthorite(user, args.profileId, args.userId);

    const firstPeriod = SubtractFromDate(new Date(), {
      hours: args.sinceHours,
    });

    const secondPeriod = SubtractFromDate(new Date(), {
      hours: args.sinceHours * 2,
    });

    const [
      total_followers,
      prev_total_followers,
      total_likes,
      prev_total_likes,
      total_comments,
      prev_total_comments,
      total_saves,
      prev_total_saves,
      total_visits,
      prev_total_visits,
    ] = await this.prisma.$transaction([
      this.prisma.follow.count({
        where: {
          AND: [
            {
              followingProfileId: args.profileId,
            },
            {
              followedAt: {
                gte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.follow.count({
        where: {
          AND: [
            {
              followingProfileId: args.profileId,
            },
            {
              followedAt: {
                gte: secondPeriod,
              },
            },
            {
              followedAt: {
                lte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.contentReaction.count({
        where: {
          AND: [
            {
              hostProfileId: args.profileId,
            },
            {
              reactedAt: {
                gte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.contentReaction.count({
        where: {
          AND: [
            {
              hostProfileId: args.profileId,
            },
            {
              reactedAt: {
                gte: secondPeriod,
              },
            },
            {
              reactedAt: {
                lte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.comment.count({
        where: {
          AND: [
            {
              hostProfileid: args.profileId,
            },
            {
              createdAt: {
                gte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.comment.count({
        where: {
          AND: [
            {
              hostProfileid: args.profileId,
            },
            {
              createdAt: {
                gte: secondPeriod,
              },
            },
            {
              createdAt: {
                lte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.savedItem.count({
        where: {
          AND: [
            {
              createdAt: {
                gte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.savedItem.count({
        where: {
          AND: [
            {
              userId: args.userId,
            },
            {
              createdAt: {
                gte: secondPeriod,
              },
            },
            {
              createdAt: {
                lte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.profileVisit.count({
        where: {
          AND: [
            {
              profileId: args.profileId,
            },
            {
              createdAt: {
                gte: firstPeriod,
              },
            },
          ],
        },
      }),

      this.prisma.profileVisit.count({
        where: {
          AND: [
            {
              profileId: args.profileId,
            },
            {
              createdAt: {
                gte: secondPeriod,
              },
            },
            {
              createdAt: {
                lte: firstPeriod,
              },
            },
          ],
        },
      }),
    ]);

    return {
      total_followers,
      prev_total_followers,
      total_comments,
      prev_total_comments,
      total_visits,
      prev_total_visits,
      total_saves,
      prev_total_saves,
      total_likes,
      prev_total_likes,
    };
  }

  @Query(() => ProfileOverviewStatistics)
  async getProfileOverviewStatistics(
    @Args('args') args: GetProfileStatisticsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileOverviewStatistics> {
    await this.validateAuthorite(user, args.profileId, args.userId);

    const firstPeriod = SubtractFromDate(new Date(), {
      hours: args.sinceHours,
    });

    const reached = await this.prisma.profileReached.count({
      where: {
        AND: [
          {
            profileId: args.profileId,
          },
          {
            createdAt: {
              gte: firstPeriod,
            },
          },
        ],
      },
    });

    const engaged = await this.prisma.profileEngaged.count({
      where: {
        AND: [
          {
            profileId: args.profileId,
          },
          {
            createdAt: {
              gte: firstPeriod,
            },
          },
        ],
      },
    });

    const activity = await this.prisma.profileActivity.count({
      where: {
        AND: [
          {
            profileId: args.profileId,
          },
          {
            createdAt: {
              gte: firstPeriod,
            },
          },
        ],
      },
    });

    return {
      activity,
      engaged,
      reached,
    };
  }

  @Query(() => [ProfileReachedAudience])
  async getProfileReachedAudinece(
    @Args('args') args: GetProfileStatisticsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileReachedAudience[]> {
    await this.validateAuthorite(user, args.profileId, args.userId);

    const firstPeriod = SubtractFromDate(new Date(), {
      hours: args.sinceHours,
    });

    const res = await this.prisma.profileReached.findMany({
      where: {
        AND: [
          {
            profileId: args.profileId,
          },
          {
            createdAt: {
              gte: firstPeriod,
            },
          },
        ],
      },
    });

    return res;
  }

  @Query(() => StoryView)
  async getProfilePopularStoriesViews(
    @Args('args') args: GetProfilePopularStoriesViewsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<StoryView[]> {
    await this.validateAuthorite(user, args.profileId, args.userId);

    const requestedDate = new Date(args.date);

    const res = await this.prisma.storyView.findMany({
      where: {
        AND: [
          {
            storyPublisherProfileId: args.profileId,
          },
          {
            createdAt: {
              gte: new Date(
                requestedDate.getFullYear(),
                requestedDate.getMonth(),
                requestedDate.getDate(),
                0,
                0,
                0,
                0,
              ),
            },
          },
          {
            createdAt: {
              lte: new Date(
                requestedDate.getFullYear(),
                requestedDate.getMonth(),
                requestedDate.getDate() + 1,
                0,
                0,
                0,
                0,
              ),
            },
          },
        ],
      },
    });

    return res;
  }

  @Query(() => ProfileVisitsDetails)
  async getProfileVisitsDetails(
    @Args('args') args: GetProfileVisitsDetailsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileVisitsDetails> {
    await this.validateAuthorite(user, args.profileId);

    const res = await this.prisma.profileVisitStats.findMany({
      where: {
        AND: [
          {
            profileId: args.profileId,
          },
        ],
      },
    });

    const totalProfileVisits = res.reduce((acc, curr) => acc + curr.visits, 0);

    return {
      countries: res.map((country) => ({
        ...country,
        visitPercent: country.visits / totalProfileVisits,
      })),
      // countries: Object.entries(
      //   res.reduce((acc, curr) => {
      //     const country = acc[curr.country];

      //     if (country) return { ...acc, [curr.country]: country + 1 };
      //     return { ...acc, [args.country]: 1 };
      //   }, {} as Record<string, number>),
      // ).map(([key, v]) => ({ visits: v, country: key } as ProfileVisitDetails)),
    };
  }

  @Query(() => [Story])
  async getTopProfileStories(
    @Args('args') args: GetTopProfilePostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Story[]> {
    await this.validateAuthorite(user, args.profileId);
    const { take, skip } = ExtractPagination(args.pagination);

    const firstPeriod = SubtractFromDate(new Date(), {
      hours: args.sinceHours,
    });

    const res = await this.prisma.story.findMany({
      where: {
        AND: [
          {
            profileId: args.profileId,
          },
          {
            createdAt: {
              gte: firstPeriod,
            },
          },
        ],
      },
      take,
      skip,
    });

    return res;
  }

  @Query(() => [NewsfeedPost])
  async getTopProfilePosts(
    @Args('args') args: GetTopProfilePostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<NewsfeedPost[]> {
    await this.validateAuthorite(user, args.profileId);
    const { take, skip } = ExtractPagination(args.pagination);

    const firstPeriod = SubtractFromDate(new Date(), {
      hours: args.sinceHours,
    });

    const res = await this.prisma.newsfeedPost.findMany({
      where: {
        AND: [
          {
            authorProfileId: args.profileId,
          },
          {
            createdAt: {
              gte: firstPeriod,
            },
          },
        ],
      },
      take,
      skip,
    });

    return res;
  }

  validateAuthorite(
    user: AuthorizationDecodedUser,
    ownerId: string,
    userId?: string,
  ) {
    const error = new UnauthorizedException(
      'you dont have the authorite to preform this action',
    );

    if (user.id !== ownerId) throw error;

    if (userId && user.id !== userId) throw error;
  }
}
