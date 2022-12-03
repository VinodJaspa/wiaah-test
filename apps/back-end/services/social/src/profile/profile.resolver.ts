import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import {
  Profile,
  ProfilePaginatedResponse,
  ProfileMetaPaginatedResponse,
} from '@entities';
import { ProfileService, ProfileSortKeys } from './profile.service';
import {
  CreateProfileInput,
  FollowProfileInput,
  GetMyProfileFollowersMetaInput,
  GetProfileFollowersMetaInput,
  UnFollowProfileInput,
  UpdateProfileInput,
} from '@input';
import { SearchPopularProfilesInput } from './dto';

@Resolver(() => Profile)
@UseGuards(new GqlAuthorizationGuard([]))
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

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
  async myProfile(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    return await this.profileService.getMyProfile(user.id);
  }

  @Mutation(() => Profile)
  async updateMyProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    return await this.profileService.updateMyProfile(
      updateProfileInput,
      user.id,
    );
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

  // Profile CRUD //
  // ------------------------------ //
  // Follow system //
  // ---------------------------------- //

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

  @Mutation(() => Profile)
  async followProfile(
    @Args('followUserInput') args: FollowProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Profile> {
    return await this.profileService.followProfile(args.profileId, user.id);
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
}
