import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { UpdateProfileInput, CreateProfileInput } from '@profile-input';
import {
  ProfileAlreadyBlockedException,
  ProfileBlockedException,
  ProfileNotBlockedException,
  ProfileNotfoundException,
} from '@profile-exceptions';
import {
  ProfilePaginatedResponse,
  ProfileMetaPaginatedResponse,
  Profile,
  FollowData,
  BlockedUser,
} from '@profile-entities';
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

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
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
    } = createProfileInput;

    try {
      const profile = await this.prisma.profile.create({
        data: {
          bio,
          photo,
          profession,
          visibility,
          ownerId: userId,
          lastActive: new Date(),
          username,
        },
      });

      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.profileCreated,
        new ProfileCreatedEvent({ profileId: profile.id, userId }),
      );

      return profile;
    } catch (err) {
      this.logger.log(err);
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

  getMyProfile(userId: string) {
    return this.prisma.profile.findUnique({ where: { ownerId: userId } });
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
        followersData: true,
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
      },
      rejectOnNotFound() {
        throw new ProfileNotfoundException();
      },
    });
    return { ...profile, followingData: [], postsIds: [] };
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

  async followProfile(profileId: string, userId: string): Promise<Profile> {
    const followerProfile = await this.getProfileByUserId(userId);
    const followingProfile = await this.getProfileByProfileId(profileId);
    if (!followerProfile || !followingProfile)
      throw new ProfileNotfoundException();

    const isBlocked = await this.isBlocked(followingProfile.id, userId);
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
          followingData: {
            push: { id: followingProfile.id, followedAt: new Date() },
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
          followersData: {
            push: { id: followerProfile.id, followedAt: new Date() },
          },
        },
        select: {
          ownerId: true,
          id: true,
        },
      });

      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.profileFollowed,
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
        const followingData = await this.getFollowingDataByProfileId(
          userProfileId,
        );
        const follower = await this.prisma.profile.update({
          where: {
            id: userProfileId,
          },
          data: {
            following: {
              decrement: 1,
            },
            followingData: {
              set: followingData.filter((f) => f.id !== profileId),
            },
          },
          select: {
            id: true,
            ownerId: true,
          },
        });

        // update the following
        const followersData = await this.getFollowersDataByProfileId(profileId);
        const followed = await this.prisma.profile.update({
          where: {
            id: userProfileId,
          },
          data: {
            followers: {
              decrement: 1,
            },
            followersData: {
              set: followersData.filter((f) => f.id !== userProfileId),
            },
          },
          select: {
            id: true,
            ownerId: true,
          },
        });
        this.eventClient.emit(
          KAFKA_EVENTS.SOCIAL_EVENTS.profileUnFollowed,
          new ProfileUnFollowEvent({
            followedId: followed.ownerId,
            followedProfileId: followed.id,
            followerId: follower.ownerId,
            followerProfileId: follower.id,
          }),
        );
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
    const profile = await this.prisma.profile.findFirst({
      where: {
        AND: {
          id: profileId,
          followersData: {
            some: {
              id: userProfileId,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (profile) return { followed: true, userProfileId };
    return { followed: false, userProfileId: null };
  }

  async getFollowersDataByProfileId(profileId: string): Promise<FollowData[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        followersData: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundException();
      },
    });
    return profile?.followersData || [];
  }
  async getFollowersIdsByUserId(userId: string): Promise<FollowData[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        followersData: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundException();
      },
    });
    return profile?.followersData || [];
  }

  async getFollowingDataByProfileId(profileId: string): Promise<FollowData[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        followingData: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundException();
      },
    });
    return profile?.followingData || [];
  }

  async getFollowingIdsByUserId(userId: string): Promise<FollowData[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        followingData: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundException();
      },
    });
    return profile?.followingData || [];
  }

  async getFollowersMetaByProfileId(
    pagination: GqlPaginationInput,
    profileId: string,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const followersIds = await this.getFollowersDataByProfileId(profileId);

    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const profiles = await this.prisma.profile.findMany({
      skip: skip,
      take: take,
      where: {
        id: {
          in: followersIds.map((f) => f.id),
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
      hasMore: totalSearched < followersIds.length,
      total: followersIds.length,
    };
  }

  async getFollowersMetaByUserId(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const followersData = await this.getFollowersIdsByUserId(userId);

    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const profiles = await this.prisma.profile.findMany({
      skip: skip,
      take: take,
      where: {
        id: {
          in: followersData.map((f) => f.id),
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
      hasMore: totalSearched < followersData.length,
      total: followersData.length,
    };
  }

  getMyFollowers(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.getFollowersMetaByUserId(pagination, userId);
  }

  async getFollowingsMetaByProfileId(
    pagination: GqlPaginationInput,
    profileId: string,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const followingData = await this.getFollowingDataByProfileId(profileId);

    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const profiles = await this.prisma.profile.findMany({
      skip: skip,
      take: take,
      where: {
        id: {
          in: followingData.map((f) => f.id),
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
      hasMore: totalSearched < followingData.length,
      total: followingData.length,
    };
  }

  async getFollowingsMetaByUserId(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    const followingData = await this.getFollowingIdsByUserId(userId);

    const { skip, take, totalSearched } = ExtractPagination(pagination);

    const profiles = await this.prisma.profile.findMany({
      skip: skip,
      take: take,
      where: {
        id: {
          in: followingData.map((f) => f.id),
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
      hasMore: totalSearched < followingData.length,
      total: followingData.length,
    };
  }

  getMyFollowings(
    pagination: GqlPaginationInput,
    userId: string,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.getFollowingsMetaByUserId(pagination, userId);
  }

  // Follow //
  // --------------------------------------------------
  // Block

  async getAllBlockedListByProfileId(
    profileId: string,
  ): Promise<BlockedUser[]> {
    try {
      const users = await this.prisma.blockedUser.findMany({
        where: {
          blockerProfileId: profileId,
        },
      });

      return users;
    } catch (error) {
      this.logger.log(error);
      throw new DBErrorException(ErrorMessages.db.gettingBlockedListErr);
    }
  }

  async isBlocked(
    BlockerProfileId: string,
    userProfileId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.blockedUser.findFirst({
        where: {
          AND: {
            blockedProfileId: userProfileId,
            blockerProfileId: BlockerProfileId,
          },
        },
        select: {
          id: true,
        },
        rejectOnNotFound() {
          throw new Error();
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async blockProfile(
    toBlockProfileId: string,
    userId: string,
  ): Promise<boolean> {
    // get the requesting user profile id using his userId
    const myProfileId = await this.getProfileIdByUserId(userId);

    // make sure the user is not already blocked
    const isAlreadyBlocked = await this.isBlocked(
      myProfileId,
      toBlockProfileId,
    );
    if (isAlreadyBlocked) throw new ProfileAlreadyBlockedException();

    // unFollow the profile before blocking him
    await this.unFollowProfile(toBlockProfileId, userId);

    // block the user
    try {
      await this.prisma.blockedUser.create({
        data: {
          blockedProfileId: toBlockProfileId,
          blockerProfileId: myProfileId,
        },
      });

      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.profileBlocked,
        new ProfileBlockEvent({
          blockedProfileId: toBlockProfileId,
          blockerProfileId: myProfileId,
        }),
      );

      return true;
    } catch (error) {
      this.logger.log(error);
      throw new DBErrorException(ErrorMessages.db.blockProfileErr);
    }
  }

  async unBlockProfile(
    BlockedProfileId: string,
    userId: string,
  ): Promise<boolean> {
    // get the requesting user profile id using his userId
    const myProfileId = await this.getProfileIdByUserId(userId);

    // make sure the user is blocked
    const isBlocked = await this.isBlocked(myProfileId, BlockedProfileId);
    if (!isBlocked) throw new ProfileNotBlockedException();

    // unBlock profile

    try {
      await this.prisma.blockedUser.deleteMany({
        where: {
          AND: {
            blockedProfileId: BlockedProfileId,
            blockerProfileId: myProfileId,
          },
        },
      });

      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.profileUnBlocked,
        new ProfileUnBlockedEvent({
          unBlockedProfileId: BlockedProfileId,
          unBlockerProfileID: myProfileId,
        }),
      );

      return true;
    } catch (error) {
      this.logger.log(error);
      throw new DBErrorException(ErrorMessages.db.unBlockProfileErr);
    }
  }
}
