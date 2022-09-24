import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
} from '@profile-entities';
import { ProfileService } from './profile.service';
import {
  CreateProfileInput,
  FollowProfileInput,
  UnFollowProfileInput,
  UpdateProfileInput,
} from '@profile-input';

@Resolver(() => Profile)
// @UseGuards(new GqlAuthorizationGuard([]))
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  // Profile CRUD //

  @Mutation(() => ProfileResponse)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ProfileResponse> {
    const profile = await this.profileService.create(createProfileInput, 'e10');
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

  // @Query(()=> )

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
}
