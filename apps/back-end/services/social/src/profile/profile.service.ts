import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { UpdateProfileInput, CreateProfileInput } from '@input';
import {
  ProfileAlreadyBlockedException,
  ProfileBlockedException,
  ProfileNotBlockedException,
  ProfileNotfoundException,
} from '@exceptions';
import {
  ProfilePaginatedResponse,
  ProfileMetaPaginatedResponse,
  Profile,
  Follow,
  BlockedUser,
} from '@entities';
import {
  DBErrorException,
  ExtractPagination,
  GqlPaginationInput,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';
import { ErrorMessages } from '@profile-error-messages';
import { ClientKafka } from '@nestjs/microservices';
import {
  ProfileCreatedEvent,
  ProfileBlockEvent,
  ProfileFollowedEvent,
  ProfileUnFollowEvent,
  ProfileUnBlockedEvent,
} from 'nest-dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetIsUserBlockedQuery } from '@block/queries';

type Sort = {
  key: ProfileSortKeys;
  asc: boolean;
};
export enum ProfileSortKeys {
  followers = 'followers',
  following = 'following',
}

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly querybus: QueryBus,
  ) {}

  logger = new Logger('ProfileService');

  // Profile CRUD //

  async deleteAllProfiles() {
    try {
      await this.prisma.profile.deleteMany();
      return true;
    } catch {
      return false;
    }
  }

  async create(
    createProfileInput: CreateProfileInput,
    userId: string,
  ): Promise<Profile> {
    const {
      photo,
      profession,
      bio,
      visibility = 'private',
      username,
      gender,
    } = createProfileInput;

    try {
      const profile = await this.prisma.profile.create({
        data: {
          bio,
          gender,
          photo,
          profession,
          visibility,
          ownerId: userId,
          lastActive: new Date(),
          username,
        },
        include: {
          followersData: {
            include: {
              followerProfile: true,
              followingProfile: true,
            },
          },
          followingData: {
            include: {
              followerProfile: true,
              followingProfile: true,
            },
          },
        },
      });

      try {
        this.eventClient.emit(
          KAFKA_EVENTS.PROFILE_EVENTS.profileCreated,
          new ProfileCreatedEvent({ profileId: profile.id, userId }),
        );
      } catch (error) {}

      return profile;
    } catch (err) {
      this.logger.log(err);
      console.log(err);
      throw new DBErrorException(ErrorMessages.db.creatingProfileErr);
    }
  }

  async findAll(): Promise<ProfilePaginatedResponse> {
    const profiles = await this.prisma.profile.findMany();
    return {
      data: profiles,
      hasMore: false,
      total: profiles.length,
    };
  }

  async getProfilesByNameQuery(
    q: string,
    sort: Sort,
    cursor?: string,
    take: number = 10,
  ): Promise<ProfilePaginatedResponse> {
    const profiles = await this.prisma.profile.findMany({
      where: {
        username: { contains: q },
      },
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      take,
      orderBy: {
        [sort.key]: sort.asc ? 'asc' : 'desc',
      },
    });
    return {
      data: profiles,
      hasMore: profiles.length >= take,
      total: profiles.length,
    };
  }

  getMyProfile(userId: string) {
    return this.prisma.profile.findUnique({
      where: { ownerId: userId },
      rejectOnNotFound(error) {
        throw new ProfileNotfoundException();
      },
    });
  }

  updateMyProfile(newData: UpdateProfileInput, userId: string) {
    try {
      return this.prisma.profile.update({
        where: {
          ownerId: userId,
        },
        data: newData,
      });
    } catch {
      throw new DBErrorException(ErrorMessages.db.updatingProfileErr);
    }
  }

  removeMyProfile(userId: string) {
    return this.prisma.profile.delete({ where: { ownerId: userId } });
  }

  async getProfileWithFollowersByProfileId(
    profileId: string,
  ): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        bio: true,
        followers: true,
        following: true,
        id: true,
        ownerId: true,
        photo: true,
        profession: true,
        publications: true,
        visibility: true,
        activeStatus: true,
        createdAt: true,
        lastActive: true,
        updatedAt: true,
        username: true,
        verified: true,
        visits: true,
        coverPhoto: true,
      },
      rejectOnNotFound() {
        throw new ProfileNotfoundException();
      },
    });
    return { ...profile };
  }

  async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { ownerId: userId },
      rejectOnNotFound() {
        throw new ProfileNotfoundException();
      },
    });

    return profile;
  }
  async getProfileByProfileId(profileId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      rejectOnNotFound() {
        throw new ProfileNotfoundException();
      },
    });

    return profile;
  }

  async hasProfileByUserId(
    userId: string,
  ): Promise<{ profileId: string | null; has: boolean }> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });
    if (!profile) return { has: false, profileId: null };

    return { has: true, profileId: profile.id };
  }

  async getProfileIdByUserId(userId: string): Promise<string> {
    const { id } = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
      rejectOnNotFound() {
        throw new ProfileNotfoundException();
      },
    });
    return id;
  }

  // Profile CRUD //
  // ---------------------------------------
  // Follow //

  async sendFollowRequest(profileId: string, userId: string) {
    const isFollowed = await this.isFollowedByUserId(profileId, userId);
    if (isFollowed) return false;
    const followingProfile = await this.getProfileByProfileId(profileId);

    const isBlocked = this.isBlocked(followingProfile.ownerId, userId);
    if (isBlocked) return false;

    const res = await this.prisma.followRequest.create({
      data: {
        ownerId: userId,
        profileId,
      },
    });

    return !!res;
  }

  async isBlocked(blockerId: string, userId: string) {
    const isBlocked = await this.querybus.execute<
      GetIsUserBlockedQuery,
      boolean
    >(new GetIsUserBlockedQuery(blockerId, userId));
  }

  async followProfile(profileId: string, userId: string): Promise<Profile> {
    const followerProfile = await this.getProfileByUserId(userId);
    const followingProfile = await this.getProfileByProfileId(profileId);
    if (!followerProfile || !followingProfile)
      throw new ProfileNotfoundException();

    const isBlocked = this.isBlocked(followingProfile.ownerId, userId);
    if (isBlocked) throw new ProfileBlockedException();

    // update the follower
    try {
      const follower = await this.prisma.profile.update({
        where: {
          id: followerProfile.id,
        },
        data: {
          following: {
            increment: 1,
          },
        },
        select: {
          ownerId: true,
          id: true,
        },
      });

      // update the following
      const followed = await this.prisma.profile.update({
        where: {
          id: followingProfile.id,
        },
        data: {
          followers: {
            increment: 1,
          },
        },
        select: {
          ownerId: true,
          id: true,
        },
      });

      await this.prisma.follow.create({
        data: {
          followingUserId: followed.id,
          followerUserId: follower.ownerId,
          followerProfileId: followerProfile.id,
          followingProfileId: followingProfile.id,
        },
      });
      this.eventClient.emit(
        KAFKA_EVENTS.PROFILE_EVENTS.profileFollowed,
        new ProfileFollowedEvent({
          followedId: followed.ownerId,
          followedProfileId: followed.id,
          followerId: follower.ownerId,
          followerProfileId: follower.id,
        }),
      );

      return followingProfile;
    } catch (error) {
      this.logger.log(error);
      throw new DBErrorException(ErrorMessages.db.generic.dbUpdateErr);
    }
  }

  async unFollowProfile(profileId: string, userId: string): Promise<boolean> {
    const { followed, userProfileId } = await this.isFollowedByUserId(
      profileId,
      userId,
    );

    try {
      if (followed) {
        // update the follower
        const follower = await this.prisma.profile.update({
          where: {
            id: userProfileId,
          },
          data: {
            following: {
              decrement: 1,
            },
          },
          select: {
            id: true,
            ownerId: true,
          },
        });

        // update the followed
        const followed = await this.prisma.profile.update({
          where: {
            id: profileId,
          },
          data: {
            followers: {
              decrement: 1,
            },
          },
          select: {
            id: true,
            ownerId: true,
          },
        });
        await this.prisma.follow.deleteMany({
          where: {
            AND: {
              followerProfileId: follower.id,
              followingProfileId: followed.id,
            },
          },
        });

        this.eventClient.emit(
          KAFKA_EVENTS.PROFILE_EVENTS.profileUnFollowed,
          new ProfileUnFollowEvent({
            followedId: followed.ownerId,
            followedProfileId: followed.id,
            followerId: follower.ownerId,
            followerProfileId: follower.id,
          }),
        );
      } else {
        return false;
      }

      return true;
    } catch (error) {
      this.logger.log(error);
      throw new DBErrorException(ErrorMessages.db.generic.dbUpdateErr);
    }
  }

  async isFollowedByUserId(
    profileId: string,
    userId: string,
  ): Promise<{ followed: boolean; userProfileId: string | null }> {
    const { has, profileId: userProfileId } = await this.hasProfileByUserId(
      userId,
    );
    if (!has) throw new ProfileNotfoundException();
    const follow = await this.prisma.follow.findFirst({
      where: {
        AND: [
          {
            followingProfileId: profileId,
          },
          {
            followerProfileId: userProfileId,
          },
        ],
      },
    });

    if (follow) return { followed: true, userProfileId };
    return { followed: false, userProfileId: null };
  }

  async getFollowersDataByProfileId(profileId: string): Promise<Follow[]> {
    const follows = await this.prisma.follow.findMany({
      where: {
        followingProfileId: profileId,
      },
    });
    return follows || [];
  }
  async getFollowersIdsByUserId(userId: string): Promise<Follow[]> {
    const profileId = await this.getProfileIdByUserId(userId);
    const follows = await this.prisma.follow.findMany({
      where: {
        followingProfileId: profileId,
      },
    });
    return follows || [];
  }

  async getFollowingDataByProfileId(profileId: string): Promise<Follow[]> {
    const follows = await this.prisma.follow.findMany({
      where: {
        followerProfileId: profileId,
      },
    });
    return follows || [];
  }

  async getFollowingIdsByUserId(userId: string): Promise<Follow[]> {
    const profileId = await this.getProfileIdByUserId(userId);
    const follows = await this.prisma.follow.findMany({
      where: {
        followerProfileId: profileId,
      },
    });
    return follows || [];
  }

  async getFollowersMetaByProfileId(
    pagination: GqlPaginationInput,
    profileId: string,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const followers = await this.getFollowersDataByProfileId(profileId);

    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const profiles = await this.prisma.profile.findMany({
      skip: skip,
      take: take,
      where: {
        id: {
          in: followers.map((f) => f.followerProfileId),
        },
      },
      select: {
        username: true,
        id: true,
        photo: true,
      },
    });
    return {
      data: profiles,
      hasMore: totalSearched < profiles.length,
      total: profiles.length,
    };
  }

  async getFollowersByUserId(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const profileId = await this.getProfileIdByUserId(userId);
    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const follows = await this.prisma.follow.findMany({
      skip: skip,
      take: take,
      where: {
        followingProfileId: profileId,
      },
      include: {
        followerProfile: true,
      },
    });

    const followers = follows.map((f) => f.followerProfile);

    return {
      data: followers,
      hasMore: totalSearched < followers.length,
      total: followers.length,
    };
  }

  getMyFollowers(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.getFollowersByUserId(pagination, userId);
  }

  async getFollowingsByProfileId(
    pagination: GqlPaginationInput,
    profileId: string,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const follows = await this.prisma.follow.findMany({
      skip: skip,
      take: take,
      where: {
        followerProfileId: profileId,
      },
      include: {
        followingProfile: true,
      },
    });

    const following = follows.map((f) => f.followingProfile);

    return {
      data: following,
      hasMore: totalSearched < following.length,
      total: following.length,
    };
  }

  getFollowData() {
    return this.prisma.follow.findMany();
  }

  async getFollowingsByUserId(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const profileId = await this.getProfileIdByUserId(userId);

    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const follows = await this.prisma.follow.findMany({
      skip: skip,
      take: take,
      where: {
        followerProfileId: profileId,
      },
      include: {
        followingProfile: true,
      },
    });

    const following = follows.map((f) => f.followingProfile);

    return {
      data: following,
      hasMore: totalSearched < following.length,
      total: following.length,
    };
  }

  getMyFollowings(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.getFollowingsByUserId(pagination, userId);
  }

  // Follow //
  // --------------------------------------------------
  // validation //

  async canInteractWith(
    authorUserId: string,
    userId: string,
  ): Promise<boolean> {
    try {
      const isBlocked = await this.querybus.execute<
        GetIsUserBlockedQuery,
        boolean
      >(new GetIsUserBlockedQuery(authorUserId, userId));
      if (isBlocked) throw new Error('user is blocked');

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  canViewContentByUserId(
    authorUserId: string,
    viewerUserId: string,
  ): Promise<boolean> {
    return this.canInteractWith(authorUserId, viewerUserId);
  }
}
