import { Profile } from '@entities';
import { UpdateProfileAdminInput, UpdateProfileInput } from '@input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from '@profile-service';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ProfileAdminResolver {
  constructor(private service: ProfileService) {}

  @Query(() => Profile)
  async getProfile(@Args('id') id: string) {
    return this.service.getProfileByProfileId(id);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('updateProfileInput') input: UpdateProfileAdminInput,
  ) {
    const { profileId, ...rest } = input;
    return this.service.updateMyProfile(rest, profileId);
  }
}
