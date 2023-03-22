import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProfileStatistics } from './entities/profile-statistic.entity';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  SubtractFromDate,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetProfileStatisticsInput } from './dto/get-profile-statistics.input';

@Resolver(() => ProfileStatistics)
@UseGuards(new GqlAuthorizationGuard([]))
export class ProfileStatisticsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => ProfileStatistics)
  async getProfileStatistics(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') args: GetProfileStatisticsInput,
  ): Promise<ProfileStatistics> {
    await this.validateAuthorite(user, args.profileId);

    const totalFollowers = await this.prisma.follow.count({
      where: {
        AND: [
          {
            followingProfileId: args.profileId,
          },
          {
            followedAt: {
              gte: SubtractFromDate(new Date(), { hours: args.sinceHours }),
            },
          },
        ],
      },
    });

    const prevTotalFollowers = await this.prisma.follow.count({
      where: {
        AND: [
          {
            followingProfileId: args.profileId,
          },
          {
            followedAt: {
              gte: SubtractFromDate(new Date(), { hours: args.sinceHours * 2 }),
            },
          },
          {
            followedAt: {
              lte: SubtractFromDate(new Date(), { hours: args.sinceHours }),
            },
          },
        ],
      },
    });

    return {
      total_followers: totalFollowers,
      prev_total_followers: prevTotalFollowers,
    };
  }

  validateAuthorite(user: AuthorizationDecodedUser, ownerId: string) {
    if (user.id !== ownerId)
      throw new UnauthorizedException(
        'you dont have the authorite to preform this action',
      );
  }
}
