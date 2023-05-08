import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SocialTag } from './entities/social-tag.entity';
import { PrismaService } from 'prismaService';
import { GetContentTaggedProfilesInput } from './dto/get-content-tagged-profiles.input';
import { Profile } from '@entities';

@Resolver(() => SocialTag)
export class SocialTagResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => SocialTag)
  getContentTaggedProfile(
    @Args('args') args: GetContentTaggedProfilesInput,
  ): Promise<SocialTag> {
    const;
  }

  @ResolveField(() => [Profile])
  taggedProfiles(@Parent() socialTag: SocialTag) {
    return this.prisma.profile.findMany({
      where: {
        id: {
          in: socialTag.taggedUserIds,
        },
      },
    });
  }
}
