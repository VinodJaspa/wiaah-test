import { Profile } from '@entities';
import { UpdateProfileAdminInput, UpdateProfileInput } from '@input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from '@profile-service';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ProfileAdminResolver {
  constructor(
    private service: ProfileService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Profile)
  async getAdminProfile(@Args('id') id: string) {
    return this.service.getProfileByProfileId(id);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('updateProfileInput') input: UpdateProfileAdminInput,
  ) {
    const { accountId, ...rest } = input;
    return this.prisma.profile.update({
      where: {
        ownerId: accountId,
      },
      data: rest,
    });
  }
}
