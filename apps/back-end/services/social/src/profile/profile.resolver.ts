import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  NoEditPremissionPublicError,
  NoReadPremissionPublicError,
  accountType,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import {
  Profile,
  ProfilePaginatedResponse,
  ProfileMetaPaginatedResponse,
  ProfileMetaCursorPaginatedResponse,
} from '@entities';
import { ProfileService, ProfileSortKeys } from './profile.service';
import {
  CreateProfileInput,
  FollowProfileInput,
  GetMyProfileFollowersMetaInput,
  GetProfileFollowersMetaCursorInput,
  GetProfileFollowersMetaInput,
  UnFollowProfileInput,
  UpdateProfileInput,
} from '@input';
import { SearchPopularProfilesInput } from './dto';
import { PrismaService } from 'prismaService';
import { ProfileVisibility } from 'prismaClient';

@Resolver(() => Profile)
@UseGuards(new GqlAuthorizationGuard([]))
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly prisma: PrismaService,
  ) {}

  // Profile CRUD //

  @Mutation(() => Profile)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    const profile = await this.profileService.create(
      createProfileInput,
      user.id,
    );
    return profile;
  }

  @Query(() => ProfilePaginatedResponse)
  findAll(): Promise<ProfilePaginatedResponse> {
    return this.profileService.findAll();
  }

  @Query(() => Profile)
  async getProfileDetails(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('userId') userId: string,
  ) {
    await this.validateEditRequestedProfile(user, userId);
    const res = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
    });

    return res;
  }

  @Query(() => Profile)
  async myProfile(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    return await this.profileService.getMyProfile(user.id);
  }

  @Query(() => Profile)
  async getProfile(@Args('id') id: string) {
    return this.profileService.getProfileByProfileId(id);
  }

  @Mutation(() => Profile)
  async updateUserProfile(
    @Args('args') input: UpdateProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    await this.validateEditRequestedProfile(user, input.userId);
    return await this.profileService.updateUserProfile(input, user.id);
  }

  @Mutation(() => Profile)
  async deleteMyProfile(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    return await this.profileService.removeMyProfile(user.id);
  }

  @Query(() => ProfilePaginatedResponse)
  searchPopularUsers(
    @Args('args', { type: () => SearchPopularProfilesInput })
    args: SearchPopularProfilesInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.profileService.getProfilesByNameQuery(
      args.q,
      { asc: false, key: ProfileSortKeys.followers },
      args.cursor,
      args.take,
    );
  }

  validateEditRequestedProfile(user: AuthorizationDecodedUser, userId: string) {
    const valid = userId === user.id || user.accountType === accountType.ADMIN;

    if (!valid) throw new NoEditPremissionPublicError();
  }

  @ResolveField(() => Boolean)
  newStory(
    @Parent() profile: Profile,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    //TODO: get if user has new story based on profile visiablity and follow
    return false;
  }

  // Profile CRUD //
  // ------------------------------ //
  // Follow system //
  // ---------------------------------- //

  @Mutation(() => Boolean)
  sendFollowRequest(
    @Args('profileId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.profileService.sendFollowRequest(id, user.id);
  }

  @Query(() => ProfileMetaPaginatedResponse)
  getFollowersByProfileId(
    @Args('getFollowersMetaInput') args: GetProfileFollowersMetaInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.profileService.getFollowersMetaByProfileId(
      args.pagination,
      args.profileId,
      user.id,
    );
  }

  @Query(() => ProfileMetaCursorPaginatedResponse)
  async getCursorPaginationFollowersByProfileId(
    @Args('getFollowersMetaInput') args: GetProfileFollowersMetaCursorInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileMetaCursorPaginatedResponse> {
    await this.ValidateReadPermissionsProfile(args.userId, user);
    const [res, count] = await this.prisma.$transaction([
      this.prisma.follow.findMany({
        where: {
          followingUserId: args.userId,
        },
        cursor: {
          id: args.cursor,
        },
        take: args.take + 1,
      }),
      this.prisma.follow.count({
        where: {
          followingUserId: args.userId,
        },
      }),
    ]);

    const profiles = await this.prisma.profile.findMany({
      where: {
        ownerId: {
          in: res.map((follow) => follow.followerUserId),
        },
      },
    });

    return {
      data: profiles,
      hasMore: res.length > args.take,
      cursor: args.cursor,
      nextCursor: res.length > args.take ? res.at(res.length)?.id : undefined,
      total: count,
    };
  }

  @Query(() => ProfileMetaCursorPaginatedResponse)
  async getCursorPaginationFollowingsByProfileId(
    @Args('getFollowersMetaInput') args: GetProfileFollowersMetaCursorInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileMetaCursorPaginatedResponse> {
    await this.ValidateReadPermissionsProfile(args.userId, user);
    const [res, count] = await this.prisma.$transaction([
      this.prisma.follow.findMany({
        where: {
          followerUserId: args.userId,
        },
        cursor: {
          id: args.cursor,
        },
        take: args.take + 1,
      }),
      this.prisma.follow.count({
        where: {
          followerUserId: args.userId,
        },
      }),
    ]);

    const profiles = await this.prisma.profile.findMany({
      where: {
        ownerId: {
          in: res.map((follow) => follow.followerUserId),
        },
      },
    });

    return {
      data: profiles,
      hasMore: res.length > args.take,
      cursor: args.cursor,
      nextCursor: res.length > args.take ? res.at(res.length)?.id : undefined,
      total: count,
    };
  }

  @Query(() => ProfileMetaPaginatedResponse)
  getFollowingByProfileId(
    @Args('getFollowingMetaInput') args: GetProfileFollowersMetaInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.profileService.getFollowingsByProfileId(
      args.pagination,
      args.profileId,
      user.id,
    );
  }

  @Query(() => ProfileMetaPaginatedResponse)
  getMyFollowers(
    @Args('getMyFollowersInput') args: GetMyProfileFollowersMetaInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.profileService.getMyFollowers(args.pagination, user.id);
  }

  @Query(() => ProfileMetaPaginatedResponse)
  getMyFollowing(
    @Args('getMyFollowersInput') args: GetMyProfileFollowersMetaInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.profileService.getMyFollowings(args.pagination, user.id);
  }

  @Query(() => Boolean)
  async isFollowed(
    @Args('profileId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    const res = await this.profileService.isFollowedByUserId(id, user.id);
    return res.followed;
  }

  @Mutation(() => Boolean)
  async followProfile(
    @Args('followUserInput') args: FollowProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    await this.profileService.followProfile(args.profileId, user.id);
    return true;
  }

  @Mutation(() => Boolean)
  unFollow(
    @Args('unFollowProfileInput') args: UnFollowProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.profileService.unFollowProfile(args.profileId, user.id);
  }

  // Follow system //
  // ------------------------------------- //

  async ValidateReadPermissionsProfile(
    profileUserId: string,
    user: AuthorizationDecodedUser,
  ) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: profileUserId,
      },
    });
    if (
      user.id !== profile.ownerId &&
      user.accountType !== accountType.ADMIN &&
      profile.visibility !== ProfileVisibility.public
    )
      throw new NoReadPremissionPublicError();
  }
}
