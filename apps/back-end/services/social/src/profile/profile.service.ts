import { Injectable, Logger } from '@nestjs/common';
import { Profile } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { UpdateProfileInput, CreateProfileInput } from '@profile-input';
import {
  ProfileBlockedException,
  ProfileNotfoundExceptions,
} from '@profile-exceptions';
import { ProfilePaginatedResponse, ProfileResponse } from '@profile-entities';
import { DBErrorException } from 'nest-utils';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  logger = new Logger();

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
        },
      });

      return profile;
    } catch {
      throw new DBErrorException('Error Creating user entry');
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
      throw new DBErrorException('Error Updating Profile');
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
        followersIds: true,
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
      },
      rejectOnNotFound() {
        throw new ProfileNotfoundExceptions();
      },
    });
    return { ...profile, followingIds: [], postsIds: [] };
  }

  async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { ownerId: userId },
      rejectOnNotFound() {
        throw new ProfileNotfoundExceptions();
      },
    });

    return profile;
  }
  async getProfileByProfileId(profileId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      rejectOnNotFound() {
        throw new ProfileNotfoundExceptions();
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

  // Profile CRUD //
  // ---------------------------------------
  // Follow //

  async followProfile(profileId: string, userId: string): Promise<Profile> {
    const followerProfile = await this.getProfileByUserId(userId);
    const followingProfile = await this.getProfileByProfileId(profileId);
    if (!followerProfile || !followingProfile)
      throw new ProfileNotfoundExceptions();

    const isBlocked = await this.isBlocked(followingProfile, userId);
    if (isBlocked) throw new ProfileBlockedException();

    // update the follower
    await this.prisma.profile.update({
      where: {
        id: followerProfile.id,
      },
      data: {
        following: {
          increment: 1,
        },
        followingIds: {
          push: followingProfile.id,
        },
      },
    });

    // update the following
    await this.prisma.profile.update({
      where: {
        id: followingProfile.id,
      },
      data: {
        followers: {
          increment: 1,
        },
        followersIds: {
          push: followerProfile.id,
        },
      },
    });

    return followingProfile;
  }

  async unFollowProfile(profileId: string, userId: string): Promise<boolean> {
    const { followed, userProfileId } = await this.isFollowedByUserId(
      profileId,
      userId,
    );

    if (followed) {
      // update the follower
      const followingIds = await this.getFollowingIdsByProfileId(userProfileId);
      await this.prisma.profile.update({
        where: {
          id: userProfileId,
        },
        data: {
          following: {
            decrement: 1,
          },
          followingIds: {
            set: followingIds.filter((f) => f !== profileId),
          },
        },
      });

      // update the following
      const followersIds = await this.getFollowersIdsByProfileId(profileId);
      await this.prisma.profile.update({
        where: {
          id: userProfileId,
        },
        data: {
          followers: {
            decrement: 1,
          },
          followersIds: {
            set: followersIds.filter((f) => f !== userProfileId),
          },
        },
      });
    }

    return true;
  }

  async isFollowedByUserId(
    profileId: string,
    userId: string,
  ): Promise<{ followed: boolean; userProfileId: string | null }> {
    const { has, profileId: userProfileId } = await this.hasProfileByUserId(
      userId,
    );
    if (!has) throw new ProfileNotfoundExceptions();
    const profile = await this.prisma.profile.findFirst({
      where: {
        AND: {
          id: profileId,
          followersIds: {
            has: userProfileId,
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

  async getFollowersIdsByProfileId(profileId: string): Promise<string[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        followersIds: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundExceptions();
      },
    });
    return profile?.followersIds || [];
  }
  async getFollowersIdsByUserId(userId: string): Promise<string[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        followersIds: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundExceptions();
      },
    });
    return profile?.followersIds || [];
  }

  async getFollowingIdsByProfileId(profileId: string): Promise<string[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        followingIds: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundExceptions();
      },
    });
    return profile?.followingIds || [];
  }

  async getFollowingIdsByUserId(userId: string): Promise<string[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        followingIds: true,
      },
      rejectOnNotFound: () => {
        throw new ProfileNotfoundExceptions();
      },
    });
    return profile?.followingIds || [];
  }

  // Follow //
  // --------------------------------------------------
  // Block

  async isBlocked(profile: Profile, followerId: string): Promise<boolean> {
    return false;
  }

  async blockProfile() {}
}
