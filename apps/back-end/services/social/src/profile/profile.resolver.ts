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
  ProfileResponse,
  ProfileMetaPaginatedResponse,
} from '@entities';
import { ProfileService } from './profile.service';
import {
  BlockProfileInput,
  CreateProfileInput,
  FollowProfileInput,
  GetMyProfileFollowersMetaInput,
  GetProfileFollowersMetaInput,
  UnBlockProfileInput,
  UnFollowProfileInput,
  UpdateProfileInput,
} from '@input';

@Resolver(() => Profile)
@UseGuards(new GqlAuthorizationGuard([]))
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  // Profile CRUD //

  @Mutation(() => ProfileResponse)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileResponse> {
    const profile = await this.profileService.create(
      createProfileInput,
      user.id,
    );
    return {
      data: profile,
    };
  }

  @Query(() => ProfilePaginatedResponse)
  findAll(): Promise<ProfilePaginatedResponse> {
    return this.profileService.findAll();
  }

  @Query(() => ProfileResponse)
  async myProfile(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileResponse> {
    return {
      data: await this.profileService.getMyProfile(user.id),
    };
  }

  @Mutation(() => ProfileResponse)
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileResponse> {
    return {
      data: await this.profileService.updateMyProfile(
        updateProfileInput,
        user.id,
      ),
    };
  }

  @Mutation(() => ProfileResponse)
  async removeProfile(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileResponse> {
    return {
      data: await this.profileService.removeMyProfile(user.id),
    };
  }

  // TODO: remove on production
  @Mutation(() => Boolean)
  deleteAllProfiles(): Promise<boolean> {
    return this.profileService.deleteAllProfiles();
  }

  // Profile CRUD //
  // ------------------------------ //
  // Follow system //
  // ---------------------------------- //

  @Query(() => ProfileMetaPaginatedResponse)
  getFollowersByProfile(
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
  getFollowingByProfile(
    @Args('getFollowingMetaInput') args: GetProfileFollowersMetaInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileMetaPaginatedResponse> {
    return this.profileService.getFollowersMetaByProfileId(
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

  @Mutation(() => ProfileResponse)
  async followProfile(
    @Args('followUserInput') args: FollowProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileResponse> {
    return {
      data: await this.profileService.followProfile(args.profileId, user.id),
    };
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
  // Block system //

  @Mutation(() => Boolean)
  BlockProfile(
    @Args('BlockProfileInput') args: BlockProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.profileService.blockProfile(args.profileId, user.id);
  }

  @Mutation(() => Boolean)
  unBlockProfile(
    @Args('unBlockProfileInput') args: UnBlockProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.profileService.unBlockProfile(args.profileId, user.id);
  }
  // Block system //
}
